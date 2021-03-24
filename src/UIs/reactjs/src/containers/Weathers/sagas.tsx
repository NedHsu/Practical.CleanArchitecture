import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

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

export function* saveWeatherSaga(action) {
  yield put(actions.saveWeatherStart());
  try {
    const response = action.weather.id
      ? yield axios.put(action.weather.id, action.weather)
      : yield axios.post("", action.weather);
    const weather = response.data;
    yield put(actions.saveWeatherSuccess(weather));
  } catch (error) {
    console.log(error);
    yield put(actions.saveWeatherFail(error));
  }
}

export function* deleteWeatherSaga(action) {
  yield put(actions.deleteWeatherStart());
  try {
    const response = yield axios.delete(action.weather.id, action.weather);
    yield put(actions.deleteWeatherSuccess(action.weather));
    yield put(actions.fetchWeathers());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteWeatherFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.weather.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchWeather() {
  yield takeEvery(actionTypes.FETCH_WEATHERS, fetchWeathersSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER, fetchWeatherSaga);
  yield takeEvery(actionTypes.SAVE_WEATHER, saveWeatherSaga);
  yield takeEvery(actionTypes.DELETE_WEATHER, deleteWeatherSaga);
  yield takeEvery(actionTypes.FETCH_WEATHER_AUDIT_LOGS, fetchAuditLogsSaga);
}
