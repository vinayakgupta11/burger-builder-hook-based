import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import Orders from "./container/Orders/Orders";
import { Route, Switch,Redirect } from "react-router-dom";
import * as Actions from "./store/actions/index";

class App extends Component {
  state = {
    show: true,
  };
  componentDidMount() {
    this.props.onAutoSignup();
    // setTimeout(()=>{
    //   this.setState({show:false});
    // },5000);
  }
  // {this.state.show?<BurgerBuilder/>:null}
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>

      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>

        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatch = (dispatch) => {
  return {
    onAutoSignup: () => dispatch(Actions.authCheckState()),
  };
};
export default connect(mapToProps, mapDispatch)(App);
