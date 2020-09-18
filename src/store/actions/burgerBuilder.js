import * as actionTypes from '../actions/action';
import axios from "../../axios-orders";
export const addingredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
}
export const fetchingredientsfailed=()=>{
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const removeingredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    };
}
export const setIngredients=(ingi)=>{
    return{
        type: actionTypes.SET_INGREDIENT,
        ingridients:ingi
    }
}
export const initingredients=()=>
{
    return dispatch=>{
        axios
        .get("/ingredients.json")
        .then((response) => {
         dispatch(setIngredients(response.data))
        })
        .catch(err=>{
            dispatch(fetchingredientsfailed());
         
        })

    };
}