import React, { Component } from "react";
import Classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';
import * as authActions from "../../store/actions/index";
import { connect } from "react-redux";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };
  componentDidMount()
  {
    if(!this.props.buildingBurger && this.props.authRedirectPath!=='/')
    {
      this.props.OnsetAuthRedirectPath();
    }
  }
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
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  inputchangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((fe) => (
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
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
    errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect=null;
    if(this.props.isAuthenticated)
    {
      authRedirect= <Redirect to ={this.props.authRedirectPath}/>
    }
    return (
      <div className={Classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btntype="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btntype="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated:state.auth.token!==null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath:state.auth.authRedirectPath
  };
};
const mapDispatch = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>dispatch(authActions.auth(email, password, isSignup)),
    OnsetAuthRedirectPath:()=> dispatch(authActions.setAuthRedirectPath('/')) 
  };
};
export default connect(mapToProps, mapDispatch)(Auth);
