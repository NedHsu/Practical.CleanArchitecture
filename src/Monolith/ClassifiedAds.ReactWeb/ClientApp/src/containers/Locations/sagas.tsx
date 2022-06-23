import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchLocationsSaga(action) {
  yield put(actions.fetchLocationsStart());
  try {
    const response = yield axios.get("");
    const fetchedLocations = response.data;
    yield put(actions.fetchLocationsSuccess(fetchedLocations));
  } catch (error) {
    yield put(actions.fetchLocationsFail(error));
  }
}

export function* fetchLocationSaga(action) {
  yield put(actions.fetchLocationStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedLocation = response.data;
    yield put(actions.fetchLocationSuccess(fetchedLocation));
  } catch (error) {
    yield put(actions.fetchLocationFail(error));
  }
}

export function* saveLocationSaga(action) {
  yield put(actions.saveLocationStart());
  try {
    const response = action.location.id
      ? yield axios.put(action.location.id, action.location)
      : yield axios.post("", action.location);
    const location = response.data;
    yield put(actions.saveLocationSuccess(location));
  } catch (error) {
    console.log(error);
    yield put(actions.saveLocationFail(error));
  }
}

export function* deleteLocationSaga(action) {
  yield put(actions.deleteLocationStart());
  try {
    const response = yield axios.delete(action.location.id, action.location);
    yield put(actions.deleteLocationSuccess(action.location));
    yield put(actions.fetchLocations());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteLocationFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.location.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchLocation() {
  yield takeEvery(actionTypes.FETCH_LOCATIONS, fetchLocationsSaga);
  yield takeEvery(actionTypes.FETCH_LOCATION, fetchLocationSaga);
  yield takeEvery(actionTypes.SAVE_LOCATION, saveLocationSaga);
  yield takeEvery(actionTypes.DELETE_LOCATION, deleteLocationSaga);
  yield takeEvery(actionTypes.FETCH_LOCATION_AUDIT_LOGS, fetchAuditLogsSaga);
}
