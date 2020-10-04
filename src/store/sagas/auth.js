import { put } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";
export function* logoutSaga(action) {
  // yield call([localStorage, 'removeItem'], "token") we can include in redux-saga/effects
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("ExpirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSuceed());
}

export function* checkauthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk";
  }
  try {
    const response = yield axios.post(url, authData); //due to yield execution will pause and wait for result
    const expDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("ExpirationDate", expDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkauthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authfail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action)
{
    const token = yield localStorage.getItem("token");
    if (!token)
    yield put(actions.logout());
    else {
      const expDate = yield new Date(localStorage.getItem("ExpirationDate"));
      if (expDate <= new Date()) 
      yield put(actions.logout());
      else {
        const userId = yield localStorage.getItem("userId");
       yield put(actions.authSuccess(token, userId));
       yield put(actions.checkauthTimeout((expDate.getTime() - new Date().getTime())/1000));
      }
    }
}