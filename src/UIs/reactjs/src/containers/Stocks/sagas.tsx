import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { urlParams } from "../../shared/utility";

export function* fetchStocksSaga(action) {
  yield put(actions.fetchStocksStart());
  try {
    const response = yield axios.get(urlParams(action.options));
    const fetchedStocks = response.data;
    yield put(actions.fetchStocksSuccess(fetchedStocks));
  } catch (error) {
    yield put(actions.fetchStocksFail(error));
  }
}

export function* fetchStockOptionsSaga(action) {
  yield put(actions.fetchStockOptionsStart());
  try {
    const response = yield axios.get(urlParams(action.options));
    const fetchedStocks = response.data;
    console.log(fetchedStocks);
    yield put(actions.fetchStockOptionsSuccess(fetchedStocks));
  } catch (error) {
    yield put(actions.fetchStockOptionsFail(error));
  }
}

export function* fetchStockFundersSaga(action) {
  yield put(actions.fetchStockFundersStart());
  try {
    const response = yield axios.get("funder" + urlParams(action.options));
    const fetchedStockFunders = response.data;
    yield put(actions.fetchStockFundersSuccess(fetchedStockFunders));
  } catch (error) {
    yield put(actions.fetchStockFundersFail(error));
  }
}

export function* fetchStockRevenuesSaga(action) {
  yield put(actions.fetchStockRevenuesStart());
  try {
    const response = yield axios.get("revenue" + urlParams(action.options));
    const fetchedStockRevenues = response.data;
    yield put(actions.fetchStockRevenuesSuccess(fetchedStockRevenues));
  } catch (error) {
    yield put(actions.fetchStockRevenuesFail(error));
  }
}

export function* fetchGroupStocksSaga(action) {
  yield put(actions.fetchStocksStart());
  try {
    const response = yield axios.get(`/groupId/${action.group?.id}`);
    const fetchedStocks = response.data;
    yield put(actions.fetchGroupStocksSuccess(fetchedStocks));
  } catch (error) {
    yield put(actions.fetchStocksFail(error));
  }
}

export function* fetchIndustrysSaga() {
  yield put(actions.fetchStocksStart());
  try {
    const response = yield axios.get(`/Industry`);
    const fetchedIndustrys = response.data;
    yield put(actions.fetchIndustrysSuccess(fetchedIndustrys));
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
  yield takeEvery(actionTypes.FETCH_INDUSTRYS, fetchIndustrysSaga);
  yield takeEvery(actionTypes.FETCH_GROUP_STOCKS, fetchGroupStocksSaga);
  yield takeLatest(actionTypes.FETCH_STOCKS, fetchStocksSaga);
  yield takeLatest(actionTypes.FETCH_STOCK_OPTIONS, fetchStockOptionsSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_FUNDERS, fetchStockFundersSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_REVENUES, fetchStockRevenuesSaga);
  yield takeEvery(actionTypes.FETCH_STOCK, fetchStockSaga);
  yield takeEvery(actionTypes.SAVE_STOCK, saveStockSaga);
  yield takeEvery(actionTypes.DELETE_STOCK, deleteStockSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_AUDIT_LOGS, fetchAuditLogsSaga);
}
