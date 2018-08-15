import { createDuck } from "redux-duck";
import { fromJS } from "immutable";

const ducks = createDuck("travelApp");

export const CLOSE_NOT = ducks.defineType("CLOSE_NOT");
export const closeNot = ducks.createAction(CLOSE_NOT);

export const SET_DEPARTURE_CITY = ducks.defineType("SET_DEPARTURE_CITY");
export const setDeparureCity = ducks.createAction(SET_DEPARTURE_CITY);

export const SET_ARRIVAL_CITY = ducks.defineType("SET_ARRIVAL_CITY");
export const setArrivalCity = ducks.createAction(SET_ARRIVAL_CITY);

export const SET_NIGHTS_QUANTITY = ducks.defineType("SET_NIGHTS_QUANTITY");
export const setNightsQuantity = ducks.createAction(SET_NIGHTS_QUANTITY);

export const SET_MONTH = ducks.defineType("SET_MONTH");
export const setMonth = ducks.createAction(SET_MONTH);

export const TOGGLE_FILTERS = ducks.defineType("TOGGLE_FILTERS");
export const toggleFilters = ducks.createAction(TOGGLE_FILTERS);

export const CLOSE_FILTER = ducks.defineType("CLOSE_FILTER");
export const closeFilter = ducks.createAction(CLOSE_FILTER);

export const UPDATED = ducks.defineType("UPDATED");
export const updated = ducks.createAction(UPDATED);

export const TURN_OFF_LOADING = ducks.defineType("TURN_OFF_LOADING");
export const turnOffLoading = ducks.createAction(TURN_OFF_LOADING);

export const TURN_ON_LOADING = ducks.defineType("TURN_ON_LOADING");
export const turnOnLoading = ducks.createAction(TURN_ON_LOADING);

export const HANDLE_CLOSE_MODAL = ducks.defineType("HANDLE_CLOSE_MODAL");
export const handleCloseModal = ducks.createAction(HANDLE_CLOSE_MODAL);

export const HANDLE_OPEN_MODAL = ducks.defineType("HANDLE_OPEN_MODAL");
export const handleOpenModal = ducks.createAction(HANDLE_OPEN_MODAL);

export const APPLY_FILTERS = ducks.defineType("APPLY_FILTERS");
export const applyFilters = ducks.createAction(APPLY_FILTERS);

export const SET_FILTERED_DATA = ducks.defineType("SET_FILTERED_DATA");
export const SetFilteredData = ducks.createAction(SET_FILTERED_DATA);

const initialState = fromJS({
  departureCity: "Везде",
  arrivalCity: "Везде",
  data: {},
  filterChanged: false,
  filteredData: [],
  countriesList: [],
  not: false,
  loading: true,
  modalVisibility: false,
  nights: 4,
  month: 13,
  appWasUsed: false,
  filterOpened: false
});

export default ducks.createReducer(
  {
    [CLOSE_NOT]: state => state.set("not", false),
    [TOGGLE_FILTERS]: (state, { payload }) => {
      return state.set("filterOpened", payload);
    },
    [CLOSE_FILTER]: state => state.set("filterOpened", false),
    [APPLY_FILTERS]: state => state.set("filterChanged", false),
    [SET_FILTERED_DATA]: (state, { payload }) =>
      state
        .set("filteredData", payload)
        .set("appWasUsed", true)
        .set("filterChanged", false),
    [SET_DEPARTURE_CITY]: (state, { payload }) => {
      localStorage.setItem("departureCity", payload);
      return state.setIn(["departureCity"], payload).set("filterChanged", true);
    },
    [SET_NIGHTS_QUANTITY]: (state, { payload }) => {
      localStorage.setItem("nights", payload);
      return state.set("nights", payload).set("filterChanged", true);
    },
    [SET_MONTH]: (state, { payload }) => {
      localStorage.setItem("month", payload);
      return state.set("month", payload).set("filterChanged", true);
    },
    [TURN_OFF_LOADING]: state => state.setIn(["loading"], false),
    [TURN_ON_LOADING]: state => state.setIn(["loading"], true),
    [HANDLE_CLOSE_MODAL]: state => state.setIn(["modalVisibility"], false),
    [HANDLE_OPEN_MODAL]: state => state.setIn(["modalVisibility"], true),
    [SET_ARRIVAL_CITY]: (state, { payload }) => {
      localStorage.setItem("arrivalCity", payload);
      return state.setIn(["arrivalCity"], payload).set("filterChanged", true);
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
        .setIn(["loading"], false)
  },
  initialState
);

const output = data =>
  Object.keys(data).map(function(key) {
    return data[key];
  });
