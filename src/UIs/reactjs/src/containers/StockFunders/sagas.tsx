import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockFundersSaga(action) {
  yield put(actions.fetchStockFundersStart());
  try {
    const response = yield axios.get("");
    const fetchedStockFunders = response.data;
    yield put(actions.fetchStockFundersSuccess(fetchedStockFunders));
  } catch (error) {
    yield put(actions.fetchStockFundersFail(error));
  }
}

export function* fetchStockFunderSaga(action) {
  yield put(actions.fetchStockFunderStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockFunder = response.data;
    yield put(actions.fetchStockFunderSuccess(fetchedStockFunder));
  } catch (error) {
    yield put(actions.fetchStockFunderFail(error));
  }
}

export function* saveStockFunderSaga(action) {
  yield put(actions.saveStockFunderStart());
  try {
    const response = action.stockfunder.id
      ? yield axios.put(action.stockfunder.id, action.stockfunder)
      : yield axios.post("", action.stockfunder);
    const stockfunder = response.data;
    yield put(actions.saveStockFunderSuccess(stockfunder));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockFunderFail(error));
  }
}

export function* deleteStockFunderSaga(action) {
  yield put(actions.deleteStockFunderStart());
  try {
    const response = yield axios.delete(action.stockfunder.id, action.stockfunder);
    yield put(actions.deleteStockFunderSuccess(action.stockfunder));
    yield put(actions.fetchStockFunders());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockFunderFail(error));
  }
}

export function* watchStockFunder() {
  yield takeEvery(actionTypes.FETCH_FUNDERS, fetchStockFundersSaga);
  yield takeEvery(actionTypes.FETCH_FUNDER, fetchStockFunderSaga);
  yield takeEvery(actionTypes.SAVE_FUNDER, saveStockFunderSaga);
  yield takeEvery(actionTypes.DELETE_FUNDER, deleteStockFunderSaga);
}
