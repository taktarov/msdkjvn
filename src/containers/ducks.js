import { createDuck } from "redux-duck";
import { fromJS } from "immutable";

const ducks = createDuck("travelApp");

export const OPEN_DRAWER = ducks.defineType("OPEN_DRAWER");
export const openDrawer = ducks.createAction(OPEN_DRAWER);

export const CLOSE_DRAWER = ducks.defineType("CLOSE_DRAWER");
export const closeDrawer = ducks.createAction(CLOSE_DRAWER);

export const CLOSE_NOT = ducks.defineType("CLOSE_NOT");
export const closeNot = ducks.createAction(CLOSE_NOT);

export const SET_DEPARTURE_CITY = ducks.defineType("SET_DEPARTURE_CITY");
export const setDeparureCity = ducks.createAction(SET_DEPARTURE_CITY);

export const SET_ARRIVAL_CITY = ducks.defineType("SET_ARRIVAL_CITY");
export const setArrivalCity = ducks.createAction(SET_ARRIVAL_CITY);

export const UPDATED = ducks.defineType("UPDATED");
export const updated = ducks.createAction(UPDATED);

const departureCity = localStorage.getItem("departureCity");
const arrivalCity = localStorage.getItem("arrivalCity");

const initialState = fromJS({
  drawerOpened: false,
  departureCity:
    departureCity !== null && departureCity.length > 0
      ? departureCity
      : "Везде",
  arrivalCity:
    arrivalCity !== null ? filterAll(JSON.parse(arrivalCity)) : ["Везде"],
  data: {},
  countriesList: [],
  not: false
});

export default ducks.createReducer(
  {
    [OPEN_DRAWER]: state => state.setIn(["drawerOpened"], true),
    [CLOSE_DRAWER]: state => state.setIn(["drawerOpened"], false),
    [CLOSE_NOT]: state => state.setIn(["not"], false),
    [SET_DEPARTURE_CITY]: (state, { payload }) => {
      localStorage.setItem("departureCity", payload);
      return state.setIn(["departureCity"], payload);
    },

    [SET_ARRIVAL_CITY]: (state, { payload }) => {
      localStorage.setItem("arrivalCity", JSON.stringify(Array.from(payload)));
      return state.setIn(["arrivalCity"], filterAll(Array.from(payload)));
    },
    [UPDATED]: (state, { payload }) =>
      state
        .setIn(["data"], payload)
        .setIn(
          ["countriesList"],
          Array.from(new Set(output(payload).map(item => item.to || item.To)))
        )
        .setIn(["not"], true)
  },
  initialState
);

const output = data =>
  Object.keys(data).map(function(key) {
    return data[key];
  });

function filterAll(array) {
  if (array.indexOf("Везде") + 1 === array.length && array.length > 1) {
    return ["Везде"];
  }
  if (array.length === 0) {
    return ["Везде"];
  }
  if (array.length >= 2 && array.indexOf("Везде") !== -1) {
    const newArray = array.splice(array.indexOf("Везде") + 1, 1);
    return newArray;
  }
  if (array.indexOf("Везде") !== -1 && array.length === 1) {
    return ["Везде"];
  }
  return array;
}
