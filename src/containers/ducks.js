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

export const TURN_OFF_LOADING = ducks.defineType("TURN_OFF_LOADING");
export const turnOffLoading = ducks.createAction(TURN_OFF_LOADING);

export const HANDLE_CLOSE_MODAL = ducks.defineType("HANDLE_CLOSE_MODAL");
export const handleCloseModal = ducks.createAction(HANDLE_CLOSE_MODAL);

export const HANDLE_OPEN_MODAL = ducks.defineType("HANDLE_OPEN_MODAL");
export const handleOpenModal = ducks.createAction(HANDLE_OPEN_MODAL);

handleCloseModal;

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
  not: false,
  loading: true,
  modalVisibility: false
});

export default ducks.createReducer(
  {
    [OPEN_DRAWER]: state => state.setIn(["drawerOpened"], true),
    [CLOSE_DRAWER]: state => state.setIn(["drawerOpened"], false),
    [CLOSE_NOT]: state => state.setIn(["not"], false),
    [SET_DEPARTURE_CITY]: (state, { payload }) => {
      localStorage.setItem("departureCity", payload);
      return state.setIn(["departureCity"], payload).setIn(["loading"], true);
    },

    [TURN_OFF_LOADING]: state => state.setIn(["loading"], false),
    [HANDLE_CLOSE_MODAL]: state => state.setIn(["modalVisibility"], false),
    [HANDLE_OPEN_MODAL]: state => state.setIn(["modalVisibility"], true),
    [SET_ARRIVAL_CITY]: (state, { payload }) => {
      localStorage.setItem("arrivalCity", JSON.stringify(Array.from(payload)));
      return state
        .setIn(["arrivalCity"], filterAll(Array.from(payload)))
        .setIn(["loading"], true);
    },
    [UPDATED]: (state, { payload }) =>
      state
        .setIn(["data"], payload)
        .setIn(
          ["countriesList"],
          Array.from(
            new Set(output(payload).map(item => item.to || item.To))
          ).sort()
        )
        .setIn(["not"], true)
        .setIn(["loading"], false)
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
