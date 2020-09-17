import React from 'react'
import Classes from './BuildControls.css'
import BuildControl  from './BuildControl/BuildControl'
const control= [
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
]
const buildControls=(props)=>{ 
    return(
        <div className={Classes.BuildControls}>
            <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {control.map(ctrl=>(
            <BuildControl 
            key={ctrl.label}
             label= {ctrl.label}
             added={()=>props.ingridientAdded(ctrl.type)}
             removed={()=>props.ingridientRemove(ctrl.type)}
              disabled={props.disabled[ctrl.type]}
             />
        ))}
        <button className={Classes.OrderButton} disabled={!props.purchase} onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}
export default buildControls;