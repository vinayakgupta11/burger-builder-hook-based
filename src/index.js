import React from "react";
import ReactDOM from "react-dom";
import { createStore ,applyMiddleware,compose,combineReducers} from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import BurgerBuilderreducer from "./store/reducers/BurgerBuilder";
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {watchAuth,watchOrder} from './store/sagas/index';
const composeEnhancers =process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
const rootReducer= combineReducers({
  burgerBuilder:BurgerBuilderreducer,
  order:orderReducer,
  auth:authReducer
});
const sagaMiddleware= createSagaMiddleware();
const store= createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware)
));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchOrder);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
