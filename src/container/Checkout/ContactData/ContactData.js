import React, { Component } from "react";
import Classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
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
          minLength: 5,
          maxLength: 8,
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
          minLength: 5,
          maxLength: 10,
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
          minLength: 5,
          maxLength: 10,
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
          minLength: 5,
          maxLength: 10,
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
          minLength: 5,
          maxLength: 10,
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
        value: "",
        valid:true
      },
    },
    formIsValid: false,
    loading: false,
  };
  orderHandler = (event) => {
    console.log(this.props.price);
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let ele in this.state.orderForm) {
      formData[ele] = this.state.orderForm[ele].value;
    }
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    console.log(data);
    axios
      .post("/orders.json", data)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules && rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
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
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data</h4>

        {form}
      </div>
    );
  }
}
export default ContactData;
