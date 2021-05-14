import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchPageEffectsSaga(action) {
  yield put(actions.fetchPageEffectsStart());
  try {
    const response = yield axios.get("");
    const fetchedPageEffects = response.data;
    yield put(actions.fetchPageEffectsSuccess(fetchedPageEffects));
  } catch (error) {
    yield put(actions.fetchPageEffectsFail(error));
  }
}

export function* fetchPageEffectSaga(action) {
  yield put(actions.fetchPageEffectStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedPageEffect = response.data;
    yield put(actions.fetchPageEffectSuccess(fetchedPageEffect));
  } catch (error) {
    yield put(actions.fetchPageEffectFail(error));
  }
}

export function* savePageEffectSaga(action) {
  yield put(actions.savePageEffectStart());
  try {
    const response = action.pageeffect.id
      ? yield axios.put(action.pageeffect.id, action.pageeffect)
      : yield axios.post("", action.pageeffect);
    const pageeffect = response.data;
    yield put(actions.savePageEffectSuccess(pageeffect));
  } catch (error) {
    console.log(error);
    yield put(actions.savePageEffectFail(error));
  }
}

export function* deletePageEffectSaga(action) {
  yield put(actions.deletePageEffectStart());
  try {
    const response = yield axios.delete(action.pageeffect.id, action.pageeffect);
    yield put(actions.deletePageEffectSuccess(action.pageeffect));
    yield put(actions.fetchPageEffects());
  } catch (error) {
    console.log(error);
    yield put(actions.deletePageEffectFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.pageeffect.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchPageEffect() {
  yield takeEvery(actionTypes.FETCH_PRODUCTS, fetchPageEffectsSaga);
  yield takeEvery(actionTypes.FETCH_PRODUCT, fetchPageEffectSaga);
  yield takeEvery(actionTypes.SAVE_PRODUCT, savePageEffectSaga);
  yield takeEvery(actionTypes.DELETE_PRODUCT, deletePageEffectSaga);
  yield takeEvery(actionTypes.FETCH_PRODUCT_AUDIT_LOGS, fetchAuditLogsSaga);
}
