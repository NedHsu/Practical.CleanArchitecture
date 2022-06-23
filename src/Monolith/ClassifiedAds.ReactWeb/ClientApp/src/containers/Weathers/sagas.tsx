import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

console.log("sagas");

export function* fetchWeathersSaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.get("");
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeathersSuccess(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherTidalSaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.post("Tidal", action.query);
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeatherTidal(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherRecentSaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.post("Recent", action.query);
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeatherRecentSuccess(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherAlarmSaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.post("Alarm", action.query);
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeatherAlarmSuccess(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherEarthquakeSaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.post("Earthquake", action.query);
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeatherEarthquakeSuccess(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherCountySaga(action) {
  yield put(actions.fetchWeathersStart());
  try {
    const response = yield axios.post("County", action.query);
    const fetchedWeathers = response.data;
    yield put(actions.fetchWeatherCountySuccess(fetchedWeathers));
  } catch (error) {
    yield put(actions.fetchWeathersFail(error));
  }
}

export function* fetchWeatherSaga(action) {
  yield put(actions.fetchWeatherStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedWeather = response.data;
    yield put(actions.fetchWeatherSuccess(fetchedWeather));
  } catch (error) {
    yield put(actions.fetchWeatherFail(error));
  }
}

export function* fetchWeatherObservationSaga(action) {
  yield put(actions.fetchWeatherStart());
  try {
    const response = yield axios.post("Observation", action.query);
    const fetchedWeather = response.data;
    yield put(actions.fetchWeatherObservationSuccess(fetchedWeather));
  } catch (error) {
    yield put(actions.fetchWeatherFail(error));
  }
}


export function* watchWeather() {
  yield takeEvery(actionTypes.FETCH_WEATHERS, fetchWeathersSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_ALARM, fetchWeatherAlarmSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_COUNTY, fetchWeatherCountySaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_EARTHQUAKE, fetchWeatherEarthquakeSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_RECENT, fetchWeatherRecentSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_TIDAL, fetchWeatherTidalSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER, fetchWeatherSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_OBSERVATION, fetchWeatherObservationSaga);
}
