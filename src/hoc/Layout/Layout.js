import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Classes from './Layout.css';
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
        <Toolbar drawerToggleClicked={this.sidedrawerTogglehandler}/>
        <SideDrawer
        closed={this.sideDrawerClosedHandler}
        open={this.state.showSideDrawer}/>
        <main className={Classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
 
    }
    
}
export default Layout;