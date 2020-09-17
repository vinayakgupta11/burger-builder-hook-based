import React from 'react';
import Classes from './Navigationitems.css';
import NavigationItem from './Navigationitem/Navigationitem'
const navigationitems= ()=>{
    return (
        <ul className={Classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>


        </ul>
      
    )
}
export default navigationitems;