import * as actionTypes from "../actions/action";
import axios from 'axios';
export const authSuccess = (authData) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      authData:authData
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
      type: actionTypes.AUTH_START
    };
  };
  export const auth = (email,password,isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk';
        if(!isSignup)
        {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAGqq89LR-DapXcBK-_fKPSSudVModeXk'
        }
        axios.post(url,authData)
        .then(res=>{
            console.log(res);
            dispatch(authSuccess(res.data))

        })
        .catch(err=>{
                console.log(err);
                dispatch(authfail(err));
        })
     
    };
  };