import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockMarginsSaga(action) {
  yield put(actions.fetchStockMarginsStart());
  try {
    const response = yield axios.get("");
    const fetchedStockMargins = response.data;
    yield put(actions.fetchStockMarginsSuccess(fetchedStockMargins));
  } catch (error) {
    yield put(actions.fetchStockMarginsFail(error));
  }
}

export function* fetchStockMarginFundersSaga(action) {
  yield put(actions.fetchStockMarginFundersStart());
  try {
    const response = yield axios.get("funders", { params: action.options });
    const fetchedStockMargins = response.data;
    yield put(actions.fetchStockMarginFundersSuccess(fetchedStockMargins));
  } catch (error) {
    yield put(actions.fetchStockMarginFundersFail(error));
  }
}

export function* fetchStockMarginSaga(action) {
  yield put(actions.fetchStockMarginStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockMargin = response.data;
    yield put(actions.fetchStockMarginSuccess(fetchedStockMargin));
  } catch (error) {
    yield put(actions.fetchStockMarginFail(error));
  }
}

export function* saveStockMarginSaga(action) {
  yield put(actions.saveStockMarginStart());
  try {
    const response = action.stockMargin.id
      ? yield axios.put(action.stockMargin.id, action.stockMargin)
      : yield axios.post("", action.stockMargin);
    const stockMargin = response.data;
    yield put(actions.saveStockMarginSuccess(stockMargin));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockMarginFail(error));
  }
}

export function* deleteStockMarginSaga(action) {
  yield put(actions.deleteStockMarginStart());
  try {
    const response = yield axios.delete(action.stockMargin.id, action.stockMargin);
    yield put(actions.deleteStockMarginSuccess(action.stockMargin));
    yield put(actions.fetchStockMargins());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockMarginFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.stockMargin.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchStockMargin() {
  yield takeEvery(actionTypes.FETCH_MARGIN_FUNDERS, fetchStockMarginFundersSaga);
  yield takeEvery(actionTypes.FETCH_MARGINS, fetchStockMarginsSaga);
  yield takeEvery(actionTypes.FETCH_MARGIN, fetchStockMarginSaga);
  yield takeEvery(actionTypes.SAVE_MARGIN, saveStockMarginSaga);
  yield takeEvery(actionTypes.DELETE_MARGIN, deleteStockMarginSaga);
  yield takeEvery(actionTypes.FETCH_MARGIN_AUDIT_LOGS, fetchAuditLogsSaga);
}
