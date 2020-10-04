import {logoutSaga, checkauthTimeoutSaga,authUserSaga,authCheckStateSaga} from './auth';
import{initingredientsSaga} from './BurgerBuilder'
import{purchaseBurgerSaga,fetchOrderSaga} from './Order'
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from "../actions/action";
export function* watchAuth(){
    //  yield all([
    //      takeEvery(.....),
    //      takeEvery(.....),
    //      takeEvery(.....),
    //      takeEvery(.....),
    // ])
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkauthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER,authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
    yield takeEvery(actionTypes.SET_INGREDIENT_SAGA, initingredientsSaga);
}
export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrderSaga);
}