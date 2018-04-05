import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./containers/index";

import mySaga from "./containers/sagas";

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const enhancers = [];
const initialState = {};
const middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware, sagaMiddleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);
sagaMiddleware.run(mySaga);
export default store;
