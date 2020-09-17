import React from "react";
import { NavLink } from "react-router-dom";
import Classes from "./Navigationitem.css";
const navigationitem = (props) => {
  return (
    <li className={Classes.NavigationItem}>
      <NavLink
       to={props.link}
       exact={props.exact}
       activeClassName={Classes.active}
      >{props.children}
      </NavLink>
    </li>
  );
};
export default navigationitem;
