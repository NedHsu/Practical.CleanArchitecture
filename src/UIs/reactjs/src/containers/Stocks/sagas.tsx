import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStocksSaga(action) {
  yield put(actions.fetchStocksStart());
  try {
    const response = yield axios.get("");
    const fetchedStocks = response.data;
    yield put(actions.fetchStocksSuccess(fetchedStocks));
  } catch (error) {
    yield put(actions.fetchStocksFail(error));
  }
}

export function* fetchStockSaga(action) {
  yield put(actions.fetchStockStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStock = response.data;
    yield put(actions.fetchStockSuccess(fetchedStock));
  } catch (error) {
    yield put(actions.fetchStockFail(error));
  }
}

export function* saveStockSaga(action) {
  yield put(actions.saveStockStart());
  try {
    const response = action.stock.code
      ? yield axios.put(action.stock.code, action.stock)
      : yield axios.post("", action.stock);
    const stock = response.data;
    yield put(actions.saveStockSuccess(stock));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockFail(error));
  }
}

export function* deleteStockSaga(action) {
  yield put(actions.deleteStockStart());
  try {
    const response = yield axios.delete(action.stock.code, action.stock);
    yield put(actions.deleteStockSuccess(action.stock));
    yield put(actions.fetchStocks());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.stock.code + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchStock() {
  yield takeEvery(actionTypes.FETCH_STOCKS, fetchStocksSaga);
  yield takeEvery(actionTypes.FETCH_STOCK, fetchStockSaga);
  yield takeEvery(actionTypes.SAVE_STOCK, saveStockSaga);
  yield takeEvery(actionTypes.DELETE_STOCK, deleteStockSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_AUDIT_LOGS, fetchAuditLogsSaga);
}
