import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockGroupsSaga(action) {
  yield put(actions.fetchStockGroupsStart());
  try {
    const response = yield axios.get("");
    const fetchedStockGroups = response.data;
    yield put(actions.fetchStockGroupsSuccess(fetchedStockGroups));
  } catch (error) {
    yield put(actions.fetchStockGroupsFail(error));
  }
}

export function* fetchStockGroupSaga(action) {
  yield put(actions.fetchStockGroupStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockGroup = response.data;
    yield put(actions.fetchStockGroupSuccess(fetchedStockGroup));
  } catch (error) {
    yield put(actions.fetchStockGroupFail(error));
  }
}

export function* saveStockGroupSaga(action) {
  yield put(actions.saveStockGroupStart());
  try {
    const response = action.stockgroup.id
      ? yield axios.put(action.stockgroup.id, action.stockgroup)
      : yield axios.post("", action.stockgroup);
    const stockgroup = response.data;
    yield put(actions.saveStockGroupSuccess(stockgroup));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockGroupFail(error));
  }
}

export function* deleteStockGroupSaga(action) {
  yield put(actions.deleteStockGroupStart());
  try {
    const response = yield axios.delete(action.stockgroup.id, action.stockgroup);
    yield put(actions.deleteStockGroupSuccess(action.stockgroup));
    yield put(actions.fetchStockGroups());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockGroupFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.stockgroup.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchStockGroup() {
  yield takeEvery(actionTypes.FETCH_STOCK_GROUPS, fetchStockGroupsSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_GROUP, fetchStockGroupSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_GROUP, saveStockGroupSaga);
  yield takeEvery(actionTypes.DELETE_STOCK_GROUP, deleteStockGroupSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS, fetchAuditLogsSaga);
}
