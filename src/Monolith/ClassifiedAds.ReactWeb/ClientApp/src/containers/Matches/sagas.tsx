import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchMatchesSaga(action) {
  yield put(actions.fetchMatchesStart());
  try {
    const response = yield axios.get("");
    const fetchedMatches = response.data;
    yield put(actions.fetchMatchesSuccess(fetchedMatches));
  } catch (error) {
    yield put(actions.fetchMatchesFail(error));
  }
}

export function* fetchMatchSaga(action) {
  yield put(actions.fetchMatchStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedMatch = response.data;
    yield put(actions.fetchMatchSuccess(fetchedMatch));
  } catch (error) {
    yield put(actions.fetchMatchFail(error));
  }
}

export function* saveMatchSaga(action) {
  yield put(actions.saveMatchStart());
  try {
    const response = action.match.id
      ? yield axios.put(action.match.id, action.match)
      : yield axios.post("", action.match);
    const match = response.data;
    yield put(actions.saveMatchSuccess(match));
  } catch (error) {
    console.log(error);
    yield put(actions.saveMatchFail(error));
  }
}

export function* deleteMatchSaga(action) {
  yield put(actions.deleteMatchStart());
  try {
    const response = yield axios.delete(action.match.id, action.match);
    yield put(actions.deleteMatchSuccess(action.match));
    yield put(actions.fetchMatches());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteMatchFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.match.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchMatch() {
  yield takeEvery(actionTypes.FETCH_MATCHS, fetchMatchesSaga);
  yield takeEvery(actionTypes.FETCH_MATCH, fetchMatchSaga);
  yield takeEvery(actionTypes.SAVE_MATCH, saveMatchSaga);
  yield takeEvery(actionTypes.DELETE_MATCH, deleteMatchSaga);
  yield takeEvery(actionTypes.FETCH_MATCH_AUDIT_LOGS, fetchAuditLogsSaga);
}
