import React, { Component } from "react";
import { connect } from "react-redux";
import Classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as ContactActions from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      delieveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "chaeapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid:true
      },
    },
    formIsValid: false,
  };
  orderHandler = (event) => {
    console.log(this.props.price);
    event.preventDefault();
    const formData = {};
    for (let ele in this.state.orderForm) {
      formData[ele] = this.state.orderForm[ele].value;
    }
    const data = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(data);
 
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
  }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }
    return isValid;
  }

  inputchangeHandler = (event, inputidentifier) => {
    const updatedForm = {
      ...this.state.orderForm,
    };

    const updatedformEle = {
      ...updatedForm[inputidentifier],
    };
    updatedformEle.value = event.target.value;
    updatedformEle.valid = this.checkValidity(
      updatedformEle.value,
      updatedformEle.validation
    );
    updatedformEle.touched = true;
    updatedForm[inputidentifier] = updatedformEle;
    console.log(updatedForm);
    let formValid=true;
    for(let inputidentifier in updatedForm)
    {
      formValid=updatedForm[inputidentifier].valid && formValid;
    }
    console.log(formValid);
    this.setState({ orderForm: updatedForm, formIsValid:formValid });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    // console.log(formElementArray);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((fe) => (
          <Input
            key={fe.id}
            elementType={fe.config.elementType}
            elementConfig={fe.config.elementConfig}
            value={fe.config.value}
            invalid={!fe.config.valid}
            shouldValidate={fe.config.validation}
            touched={fe.config.touched}
            valueType={fe.config.elementConfig.placeholder}
            changed={(event) => this.inputchangeHandler(event, fe.id)}
          />
        ))}
        <Button btntype="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data</h4>

        {form}
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    laoding:state.order.loading
  };
};
const mapDispatch = (dispatch) => {
  return {
    onOrderBurger:(orderData)=>dispatch(ContactActions.purchaseBurger(orderData))
  };
};
export default connect(mapToProps,mapDispatch)(withErrorHandler( ContactData,axios));
