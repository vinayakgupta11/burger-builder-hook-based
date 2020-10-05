import React, { useState,useEffect,useCallback } from "react";
import {useDispatch,useSelector } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modals/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as BurgerBuilderActions from "../../store/actions/index";

const burgerBuilder=props=> {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch= useDispatch();

  const ings=useSelector(state=>{
    return state.burgerBuilder.ingredients;
  });
  const price=useSelector(state=>{
    return state.burgerBuilder.totalPrice;
  });
  const error=useSelector(state=>{
    return state.burgerBuilder.error;
  });
  const isAuthenticated=useSelector(state=>{
    return state.auth.token!==null;
  });

  const onIngredientadded= (ingName) => dispatch(BurgerBuilderActions.addingredient(ingName));
  const onIngredientremove= (ingName) =>dispatch(BurgerBuilderActions.removeingredient(ingName));
  const  onInitIngredient=useCallback(()=>dispatch(BurgerBuilderActions.initingredients()),[]);
   const onInitPurchase=()=> dispatch(BurgerBuilderActions.purchaseinit());
   const OnsetAuthRedirectPath=(path)=> dispatch(BurgerBuilderActions.setAuthRedirectPath(path)); 

  useEffect(()=>{
    onInitIngredient();
  },[onInitIngredient])
  const purchaseableHandler=(indgridient)=> {
    const sum = Object.keys(indgridient)
      .map((igkey) => {
        return indgridient[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
 const purchasingHandler = () => {
    if(isAuthenticated){
     setPurchasing(true);
    }
    else{
      OnsetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
    
  };
 const purchasingCancelHandler = () => {
    setPurchasing(false);
  };
const  purchasingContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };
  
    const disabledInfo = {
      ...ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSum = null;
    let burger = error ? (
      <p>Indgredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );
    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingridientAdded={onIngredientadded}
            ingridientRemove={onIngredientremove}
            disabled={disabledInfo}
            price={price}
            isAuth={isAuthenticated}
            purchase={purchaseableHandler(ings)}
            ordered={purchasingHandler}
          />
        </Aux>
      );
      orderSum = (
        <OrderSummary
          ingridients={ings}
          price={price}
          cancel={purchasingCancelHandler}
          continue={purchasingContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchasingCancelHandler}
        >
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    );
  
}
export default (withErrorHandler(burgerBuilder, axios));
