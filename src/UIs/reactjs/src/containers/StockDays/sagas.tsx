import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { urlParams } from "../../shared/utility";

export function* fetchStockDaysSaga(action) {
  yield put(actions.fetchStockDaysStart());
  try {
    const response = yield axios.get(urlParams(action.options));
    const fetchedStockDays = response.data;
    yield put(actions.fetchStockDaysSuccess(fetchedStockDays));
  } catch (error) {
    yield put(actions.fetchStockDaysFail(error));
  }
}

export function* fetchStocksDaysSaga(action) {
  yield put(actions.fetchStockDaysStart());
  try {
    const response = yield axios.post("", action.options);
    const fetchedStockDays = response.data;
    yield put(actions.fetchStocksDaysSuccess(fetchedStockDays));
  } catch (error) {
    yield put(actions.fetchStockDaysFail(error));
  }
}

export function* fetchStockDaySaga(action) {
  yield put(actions.fetchStockDayStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockDay = response.data;
    yield put(actions.fetchStockDaySuccess(fetchedStockDay));
  } catch (error) {
    yield put(actions.fetchStockDayFail(error));
  }
}

export function* watchStockDay() {
  yield takeEvery(actionTypes.FETCH_STOCK_DAYS, fetchStockDaysSaga);
  yield takeEvery(actionTypes.FETCH_STOCKS_DAYS, fetchStocksDaysSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_DAY, fetchStockDaySaga);
}
