import React from 'react'
import Classes from './Order.css'
const order=(props)=>{
    let ingredients=[];
    for(let ing in props.ingredients)
    {
        ingredients.push(
            {
                name:ing,
                amount:props.ingredients[ing]
            });
    }
   const ingOut= ingredients.map(ig=>{
   return <span 
          style={{
              textTransform:'capitalize',
              display:'inline-block',
              margin:'0 8px',
              border:'1px solid #ccc',
              padding:'5px'
          }}
          key={ig.name}>{ig.name} ({ig.amount})</span>
   })
   return (
    <div className={Classes.Order}>
        <p>Ingridients: {ingOut}</p>
   <p>Price:<strong>USD: {Number.parseFloat( props.price).toFixed(2)}</strong></p>
    </div>
   )
}
export default order;