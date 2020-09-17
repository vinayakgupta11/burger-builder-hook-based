import React from "react";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => {
    
  const style = {
    textTransform: "capitalize",
  };
  const igsum = Object.keys(props.ingridients).map((igkey) => {
    return (
      <li key={igkey}>
        <span style={style}>{igkey}</span>:{props.ingridients[igkey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following indgridients:</p>
      <ul>{igsum}</ul>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btntype="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btntype="Success" clicked={props.continue}>
        ORDER NOW
      </Button>
    </Aux>
  );
};
export default orderSummary;
