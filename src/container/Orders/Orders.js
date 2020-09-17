import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
    state={
        orders:[],
        laoding:true
    };
    componentDidMount() {
        console.log(this.props);
        axios
          .get("/orders.json")
          .then((res) => {
              console.log(res);
              const fetchOrder=[];
              for(let key in res.data)
              {
                  fetchOrder.push({
                      ...res.data[key],
                      id:key
                    });
              }
              console.log(fetchOrder);
            this.setState({ loading:false, orders:fetchOrder });
           
          })
          .catch(err=>{
            this.setState({laoding:false})
          })
      }
  render() {
  return(
      <div>
          {this.state.orders.map(order=> {
          return (
                  <Order 
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price}
                  />
              )}
          )}
      </div>
  )
  }
}
export default withErrorHandler(Orders,axios);
