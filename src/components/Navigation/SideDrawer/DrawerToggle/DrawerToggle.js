import React from 'react';
import Classes from './DrawerToggle.css';

const drawertoggle= (props)=>{
    return (
      <div onClick={props.clicked} className={Classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
}
export default drawertoggle;