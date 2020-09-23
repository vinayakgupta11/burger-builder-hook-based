import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Classes from './Layout.css';
import { connect } from "react-redux";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/Sidedrawer'
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sidedrawerTogglehandler=()=>{
        this.setState((prevState)=>{
       return {showSideDrawer:!prevState.showSideDrawer}
        });
    }
    render(){
        return(
            <Aux>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sidedrawerTogglehandler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
        closed={this.sideDrawerClosedHandler}
        open={this.state.showSideDrawer}/>
        <main className={Classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
 
    }
    
}
const mapToProps = (state) => {
    return {
     isAuthenticated:state.auth.token!==null
    };
  };
//   const mapDispatch = (dispatch) => {
//     return {
//       onFetchOrders: (token) => dispatch(Actions.fetchOrders(token)),
//     };
//   };
export default connect(mapToProps)(Layout);