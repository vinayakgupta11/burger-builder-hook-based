import * as actionTypes from "../actions/action";
import { updateObject } from "../utility";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};
const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const addingridient = (state, action) => {
  const updatedIngridient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngridients = updateObject(state.ingredients, updatedIngridient);
  const updatedState = {
    ingredients: updatedIngridients,
    totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIng = (state, action) => {
  const updatedIngridientR = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngridientsR = updateObject(
    state.ingredients,
    updatedIngridientR
  );
  const updatedStateR = {
    ingredients: updatedIngridientsR,
    totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedStateR);
};

const setIngredients = (state, action) => {
  return updateObject( state, {
      ingredients: {
          salad: action.ingridients.salad,
          bacon: action.ingridients.bacon,
          cheese: action.ingridients.cheese,
          meat: action.ingridients.meat
      },
      totalPrice: 4,
      error: false
  } );
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:return addingridient(state, action);
    case actionTypes.REMOVE_INGREDIENT:return removeIng(state, action);
    case actionTypes.SET_INGREDIENT:return setIngredients(state,action);
    case actionTypes.FETCH_INGREDIENT_FAILED: return updateObject(state, { error: true });
    default: return state;
  }
};
export default reducer;
