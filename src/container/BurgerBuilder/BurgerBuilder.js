import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modals/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as BurgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
  }
  purchaseableHandler(indgridient) {
    const sum = Object.keys(indgridient)
      .map((igkey) => {
        return indgridient[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  purchasingHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }
    else{
      this.props.OnsetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    
  };
  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasingContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSum = null;
    let burger = this.props.error ? (
      <p>Indgredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingridientAdded={this.props.onIngredientadded}
            ingridientRemove={this.props.onIngredientremove}
            disabled={disabledInfo}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            purchase={this.purchaseableHandler(this.props.ings)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSum = (
        <OrderSummary
          ingridients={this.props.ings}
          price={this.props.price}
          cancel={this.purchasingCancelHandler}
          continue={this.purchasingContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}
        >
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!==null
  };
};
const mapDispatch = (dispatch) => {
  return {
    onIngredientadded: (ingName) => dispatch(BurgerBuilderActions.addingredient(ingName)),
    onIngredientremove: (ingName) =>dispatch(BurgerBuilderActions.removeingredient(ingName)),
      onInitIngredient:()=>dispatch(BurgerBuilderActions.initingredients()),
      onInitPurchase:()=> dispatch(BurgerBuilderActions.purchaseinit()),
      OnsetAuthRedirectPath:(path)=> dispatch(BurgerBuilderActions.setAuthRedirectPath(path)) 
  };
};
export default connect( mapToProps, mapDispatch)(withErrorHandler(BurgerBuilder, axios));
