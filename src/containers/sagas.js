import firebase from "firebase";
import ReduxSagaFirebase from "redux-saga-firebase";
import { fork, call, put, take, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  updated,
  UPDATED,
  APPLY_FILTERS,
  turnOffLoading,
  turnOnLoading,
  SetFilteredData,
  closeFilter
} from "./ducks";
const myFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8aOh6XWun9MaTWHDF2ybrKoIF2YNdOqY",
  authDomain: "tourlane-1235.firebaseapp.com",
  databaseURL: "https://tourlane-1235.firebaseio.com",
  projectId: "tourlane-1235",
  storageBucket: "tourlane-1235.appspot.com",
  messagingSenderId: "1041502460645"
});

const rsf = new ReduxSagaFirebase(myFirebaseApp);
export default function* rootSaga(store) {
  yield fork(firebaseConnectSaga);
  yield takeLatest(APPLY_FILTERS, setFilteredDataSaga);
  yield takeLatest(UPDATED, setFilteredDataSaga);
}

function* firebaseConnectSaga() {
  const channel = yield call(rsf.database.channel, "/");
  while (true) {
    const { value: todos } = yield take(channel);
    yield put(updated(todos));
  }
}

function* workImitationSaga() {
  yield put(turnOnLoading());
  yield call(delay, 50);
  yield put(turnOffLoading());
}
var start = new Date();

function* setFilteredDataSaga(action) {
  const departureCity = yield select(state =>
    state.travelApp.get("departureCity")
  );
  const arrivalCity = yield select(state => state.travelApp.get("arrivalCity"));
  const month = yield select(state => state.travelApp.get("month"));
  const nights = yield select(state => state.travelApp.get("nights"));
  const data = yield select(state => state.travelApp.get("data"));
  const appWasUsed = yield select(state => state.travelApp.get("appWasUsed"));
  const filterChanged = yield select(state =>
    state.travelApp.get("filterChanged")
  );
  if (!appWasUsed || !filterChanged) {
    var end = new Date();
    const diff = (end - start) / 1000;
    if (diff > 30 || action.type === "travelApp/APPLY_FILTERS" || !appWasUsed) {
      start = end;
      yield put(
        SetFilteredData(
          output(data).filter(
            item =>
              checkNight(item.nights, nights) &&
              checkMonth(item.departure, month) &&
              checkDepartureCity(item.from, departureCity) &&
              checkArrivalCity(item.to, arrivalCity)
          )
        )
      );
    }
    if (action.type === "travelApp/APPLY_FILTERS") {
      yield put(closeFilter());
      yield fork(workImitationSaga);
    }
  }
}

function checkNight(nigthsOfItem, nights) {
  switch (nights) {
    case 4:
      return true;
    case 1:
      return nigthsOfItem < 6;
    case 2:
      return nigthsOfItem > 5 && nigthsOfItem < 12;
    case 3:
      return nigthsOfItem > 11;
    default:
      return false;
  }
}

function checkMonth(itemDeparure, month) {
  const itemDeparureMonth = itemDeparure.split("-")[1];
  if (month === 13) {
    return true;
  }
  return itemDeparureMonth === month.toString();
}

function checkDepartureCity(itemDeparureFrom, departureCity) {
  if (departureCity === "Везде") {
    return true;
  }
  return itemDeparureFrom === departureCity;
}

function checkArrivalCity(itemDeparureTo, arrivalCity) {
  if (arrivalCity === "Везде") {
    return true;
  }
  return itemDeparureTo === arrivalCity;
}

const output = data =>
  Object.keys(data).map(function(key) {
    return data[key];
  });
