import React, { useState } from "react";
import { connect } from "react-redux";
import Classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as ContactActions from "../../../store/actions/index";
import {updateObject, checkValidity } from "../../../shared/utility";
const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
        isNumeric: true,
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
        isEmail: true,
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
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let ele in orderForm) {
      formData[ele] = orderForm[ele].value;
    }
    const data = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(data, props.token);
  };
console.log(orderForm);
  const inputchangeHandler = (event, inputidentifier) => {

    const updatedFormElement = updateObject(orderForm[inputidentifier], {
      value: event.target.value,

      valid: checkValidity(
        event.target.value,
        orderForm[inputidentifier].validation
      ),
      touched: true
    });

    const updatedForm = updateObject(orderForm, {
      [inputidentifier]: updatedFormElement
    }); 

      
    let formIsValid = true;
    for (let inputidentifier in updatedForm) {
      formIsValid = updatedForm[inputidentifier].valid && formIsValid;
    }
    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }
   console.log(formElementArray);
  let form = (
    <form onSubmit={orderHandler}>
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
          changed={(event) => inputchangeHandler(event, fe.id)}
        />
      ))}
      <Button btntype="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.loading) form = <Spinner />;
  return (
    <div className={Classes.ContactData}>
      <h4>Enter Your Contact Data</h4>

      {form}
    </div>
  );
};

const mapToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    laoding: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatch = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(ContactActions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapToProps,
  mapDispatch
)(withErrorHandler(contactData, axios));
