import React from 'react';
import Classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import Navigationitems from '../Navigationitems/Navigationitems'
import Drawertoggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar= (props)=>{
    return (
        <header className={Classes.Toolbar}>
            <Drawertoggle clicked={props.drawerToggleClicked}/>
           <Logo height="80%"/>
            <nav className={Classes.DesktopOnly}>
               <Navigationitems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}
export default toolbar;