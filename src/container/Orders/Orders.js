import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.onFetchOrders();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.order.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}
const mapToProps = (state) => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
  };
};
const mapDispatch = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(Actions.fetchOrders()),
  };
};
export default connect(
  mapToProps,
  mapDispatch
)(withErrorHandler(Orders, axios));
