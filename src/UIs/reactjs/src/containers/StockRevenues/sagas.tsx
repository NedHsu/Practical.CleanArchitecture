import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockRevenuesSaga(action) {
  yield put(actions.fetchStockRevenuesStart());
  try {
    const response = yield axios.get("", { params: action.options });
    const fetchedStockRevenues = response.data;
    yield put(actions.fetchStockRevenuesSuccess(fetchedStockRevenues));
  } catch (error) {
    yield put(actions.fetchStockRevenuesFail(error));
  }
}

export function* fetchStockRevenueSaga(action) {
  yield put(actions.fetchStockRevenueStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockRevenue = response.data;
    yield put(actions.fetchStockRevenueSuccess(fetchedStockRevenue));
  } catch (error) {
    yield put(actions.fetchStockRevenueFail(error));
  }
}

export function* saveStockRevenueSaga(action) {
  yield put(actions.saveStockRevenueStart());
  try {
    const response = action.stockRevenue.id
      ? yield axios.put(action.stockRevenue.id, action.stockRevenue)
      : yield axios.post("", action.stockRevenue);
    const stockRevenue = response.data;
    yield put(actions.saveStockRevenueSuccess(stockRevenue));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockRevenueFail(error));
  }
}

export function* deleteStockRevenueSaga(action) {
  yield put(actions.deleteStockRevenueStart());
  try {
    const response = yield axios.delete(action.stockRevenue.id, action.stockRevenue);
    yield put(actions.deleteStockRevenueSuccess(action.stockRevenue));
    yield put(actions.fetchStockRevenues({}));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockRevenueFail(error));
  }
}

export function* watchStockRevenue() {
  yield takeEvery(actionTypes.FETCH_REVENUES, fetchStockRevenuesSaga);
  yield takeEvery(actionTypes.FETCH_REVENUE, fetchStockRevenueSaga);
  yield takeEvery(actionTypes.SAVE_REVENUE, saveStockRevenueSaga);
  yield takeEvery(actionTypes.DELETE_REVENUE, deleteStockRevenueSaga);
}
