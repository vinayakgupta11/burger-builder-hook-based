import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Classes from './Burger.css'
import {withRouter} from 'react-router-dom';
const burger= (props)=>{
    console.log(props);
    let transformIng= Object.keys(props.ingredients).map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
           return <BurgerIngredient key={igkey+i} type={igkey}/>;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    
    if(transformIng.length===0)
    transformIng= <p>Please start adding ingredient</p>;
    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformIng}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};
export default withRouter(burger);