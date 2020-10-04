import React from "react";
import Classes from "./Navigationitems.css";
import NavigationItem from "./Navigationitem/Navigationitem";
const navigationitems = (props) => {
  return (
    <ul className={Classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Auth</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};
export default navigationitems;
