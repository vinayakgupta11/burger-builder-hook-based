import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Classes from './CheckoutSummary.css'
const checkoutSumm = (props) => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btntype="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
      <Button btntype="Success" clicked={props.checkoutContinue}>Success</Button>
    </div>
  );
};
export default checkoutSumm;
