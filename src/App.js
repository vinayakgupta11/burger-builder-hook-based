import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Logout from "./container/Auth/Logout/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import * as Actions from "./store/actions/index";
const asynCheckout = React.lazy(() => {
  return import("./container/Checkout/Checkout");
});
const asynAuth = React.lazy(() => {
  return import("./container/Auth/Auth");
});
const asynOrder = React.lazy(() => {
  return import("./container/Orders/Orders");
});
const app = (props) => {
  const {onAutoSignup}=props;//new way of defining dependency
  useEffect(() => {
   
    onAutoSignup();
  }, [onAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asynAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asynCheckout} />
        <Route path="/auth" component={asynAuth} />
        <Route path="/orders" component={asynOrder} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>...loading</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};
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
export default connect(mapToProps, mapDispatch)(app);
