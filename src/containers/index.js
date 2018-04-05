import { routerReducer } from "react-router-redux";
import duck from "./ducks";
import { combineReducers } from "redux";

export default combineReducers({
  routing: routerReducer,
  travelApp: duck
});
