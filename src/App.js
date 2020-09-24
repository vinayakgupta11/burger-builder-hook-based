import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import asynCmp from './hoc/asynComp/asynCmp'
import Logout from "./container/Auth/Logout/Logout";
import { Route, Switch,Redirect } from "react-router-dom";
import * as Actions from "./store/actions/index";
const asynCheckout= asynCmp(()=>{
  return import ('./container/Checkout/Checkout');
});
const asynAuth= asynCmp(()=>{
  return import ('./container/Auth/Auth');
});
const asynOrder= asynCmp(()=>{
  return import ('./container/Orders/Orders');
})
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
        <Route path="/auth" component={asynAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>

      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asynCheckout} />
          <Route path="/auth" component={asynAuth} />
          <Route path="/orders" component={asynOrder} />
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
