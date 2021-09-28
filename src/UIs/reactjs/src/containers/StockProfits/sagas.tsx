import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockProfitsSaga(action) {
  yield put(actions.fetchStockProfitsStart());
  try {
    const response = yield axios.get("", { params: action.options });
    const fetchedStockProfits = response.data;
    yield put(actions.fetchStockProfitsSuccess(fetchedStockProfits));
  } catch (error) {
    yield put(actions.fetchStockProfitsFail(error));
  }
}

export function* fetchStockProfitSaga(action) {
  yield put(actions.fetchStockProfitStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockProfit = response.data;
    yield put(actions.fetchStockProfitSuccess(fetchedStockProfit));
  } catch (error) {
    yield put(actions.fetchStockProfitFail(error));
  }
}

export function* saveStockProfitSaga(action) {
  yield put(actions.saveStockProfitStart());
  try {
    const response = action.stockProfit.id
      ? yield axios.put(action.stockProfit.id, action.stockProfit)
      : yield axios.post("", action.stockProfit);
    const stockProfit = response.data;
    yield put(actions.saveStockProfitSuccess(stockProfit));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockProfitFail(error));
  }
}

export function* deleteStockProfitSaga(action) {
  yield put(actions.deleteStockProfitStart());
  try {
    const response = yield axios.delete(action.stockProfit.id, action.stockProfit);
    yield put(actions.deleteStockProfitSuccess(action.stockProfit));
    yield put(actions.fetchStockProfits({}));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockProfitFail(error));
  }
}

export function* watchStockProfit() {
  yield takeEvery(actionTypes.FETCH_PROFITS, fetchStockProfitsSaga);
  yield takeEvery(actionTypes.FETCH_PROFIT, fetchStockProfitSaga);
  yield takeEvery(actionTypes.SAVE_PROFIT, saveStockProfitSaga);
  yield takeEvery(actionTypes.DELETE_PROFIT, deleteStockProfitSaga);
}
