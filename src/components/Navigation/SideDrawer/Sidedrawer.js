import React from 'react';
import Classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo'
import Navigationitems from '../Navigationitems/Navigationitems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary/Auxillary'
const sidedrawer= (props)=>{
    let attachedClasses=[Classes.SideDrawer, Classes.Close];
    if(props.open)
    {
        attachedClasses=[Classes.SideDrawer, Classes.Open];
    }
    return (
       <Aux>
           <Backdrop show={props.open} clicked={props.closed}/>
           <div className={attachedClasses.join(' ')} onClick={props.closed}>
           <Logo height="11%"/>
           <nav>
               <Navigationitems isAuthenticated={props.isAuth}/>
           </nav>
       </div>
       </Aux>
    )
}
export default sidedrawer;