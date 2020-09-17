import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import Classes from './Logo.css'
const logo= (props)=>{
    return(
<div className={Classes.Logo} style={{height: props.height}}>
    <img src={burgerlogo} alt="My Burger"/>
</div>
    )
}
export default logo;