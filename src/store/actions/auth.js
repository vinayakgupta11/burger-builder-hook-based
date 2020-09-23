import * as actionTypes from "../actions/action";
import axios from "axios";
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authfail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const checkauthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("ExpirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log(expDate);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("ExpirationDate", expDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkauthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authfail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) dispatch(logout());
    else {
      const expDate = new Date(localStorage.getItem("ExpirationDate"));
      console.log(expDate);
      if (expDate <= new Date()) 
      dispatch(logout());
      else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkauthTimeout((expDate.getTime() - new Date().getTime())/1000));
      }
    }
  };
};
