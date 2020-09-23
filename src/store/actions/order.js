import * as actionTypes from "../actions/action";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchaseBurgerfail = (err) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseinit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
export const purchaseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((res) => {
        console.log(res);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerfail(err));
      });
  };
};
export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrderfail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  };
};
export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token,userId) => {
  return (dispatch) => {
      dispatch(fetchOrderStart());
      const queryParam= '?auth=' + token  + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get("/orders.json" + queryParam)
      .then((res) => {
        console.log(res);
        const fetchOrder = [];
        for (let key in res.data) {
          fetchOrder.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchOrder));
      })
      .catch((err) => {
        dispatch(fetchOrderfail(err));
      });
  };
};
