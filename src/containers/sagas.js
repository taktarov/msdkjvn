import firebase from "firebase";
import ReduxSagaFirebase from "redux-saga-firebase";
import { fork, call, put, take, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  updated,
  SET_DEPARTURE_CITY,
  SET_ARRIVAL_CITY,
  turnOffLoading
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
export default function* rootSaga() {
  yield fork(firebaseConnectSaga);
  yield takeLatest(SET_DEPARTURE_CITY, workImitationSaga);
  yield takeLatest(SET_ARRIVAL_CITY, workImitationSaga);
}

function* firebaseConnectSaga() {
  const channel = yield call(rsf.database.channel, "/");
  while (true) {
    const { value: todos } = yield take(channel);
    yield put(updated(todos));
  }
}

function* workImitationSaga() {
  yield call(delay, 800);
  yield put(turnOffLoading());
}
