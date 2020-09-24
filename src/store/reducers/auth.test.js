import reducer from './auth';
import * as actionTypes from "../actions/action";

describe('auth reducer',()=>{
it('should ret initial state',()=>{
    
    expect(reducer(undefined,{})).toEqual({
        token: null,
    userId:null,
    error: null,
    loading:false,
    authRedirectPath: '/'
    })
});

it('should store token,',()=>{
    expect(reducer({  
         token: null,
        userId:null,
        error: null,
        loading:false,
        authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS,
        idToken: 'token',
        userId: 'userid'})).toEqual({
            token: 'token',
            userId:'userid',
            error: null,
            loading:false,
            authRedirectPath: '/'

        });
})
});