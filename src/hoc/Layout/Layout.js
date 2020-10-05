import React, { useState } from "react";
import Aux from "../Auxillary/Auxillary";
import Classes from "./Layout.css";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/Sidedrawer";
const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };
  const sidedrawerTogglehandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sidedrawerTogglehandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={sideDrawerIsVisible}
      />
      <main className={Classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapToProps)(layout);
