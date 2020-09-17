import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modals/Modal";
import axios from "../../axios-orders";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/action";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error:false
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(err=>{
        this.setState({error:true})
      })
  }
  addIngridientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingredients,
    };
    updatedIngridients[type] = updatedCount;
    const priceAddition = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngridients,
    });
    this.purchaseableHandler(updatedIngridients);
  };
  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngridients = {
      ...this.state.ingredients,
    };
    updatedIngridients[type] = updatedCount;
    const pricededuct = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - pricededuct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngridients,
    });
    this.purchaseableHandler(updatedIngridients);
  };
  purchaseableHandler(indgridient) {
    const sum = Object.keys(indgridient)
      .map((igkey) => {
        return indgridient[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }
  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasingContinueHandler = () => {
    const queryParams=[];
    for(let i in this.state.ingredients)
    {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    console.log(queryParams);
    const queryString= queryParams.join('&');
    console.log(queryString);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSum = null;
    let burger = this.state.error?<p>Indgredients cannot be loaded!</p>:<Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingridientAdded={this.addIngridientHandler}
            ingridientRemove={this.removeIngridientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchase={this.state.purchaseable}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSum = (
        <OrderSummary
          ingridients={this.state.ingredients}
          price={this.state.totalPrice}
          cancel={this.purchasingCancelHandler}
          continue={this.purchasingContinueHandler}
        />
      )
    }
    if (this.state.loading) {
      orderSum = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler} >
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapToProps = (state) => {
  return {
    ings:state.ingredients
  };
};
const mapDispatch = (dispatch) => {
  return {
    onIngredientadded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName:ingName }),
    onIngredientremove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName })
  };
};
export default connect(mapToProps,mapDispatch)(withErrorHandler(BurgerBuilder, axios));
