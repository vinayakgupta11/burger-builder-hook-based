import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../../container/Checkout/ContactData/ContactData";

const checkout =props=> {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };
  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };


    let summary = <Redirect to="/" />;
    if (props.ings) {
      const purchasedRedirect= props.purchased?<Redirect to="/"/>:null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelHandler}
            checkoutContinue={checkoutContinueHandler}
          />
          <Route
            path={props.match.url + "/contact-data"}
            component={ContactData}
          />  
        </div>
      );
    }
    return <div>{summary}</div>;
  }

const mapToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased:state.order.purchased
  };
};
export default connect(mapToProps)(checkout);
