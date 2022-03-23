import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockNewsSaga(action) {
  yield put(actions.fetchStockNewsStart());
  try {
    const response = yield axios.get("");
    const fetchedStockNews = response.data;
    yield put(actions.fetchStockNewsSuccess(fetchedStockNews));
  } catch (error) {
    yield put(actions.fetchStockNewsFail(error));
  }
}

export function* fetchStockNewSaga(action) {
  yield put(actions.fetchStockNewStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockNew = response.data;
    yield put(actions.fetchStockNewSuccess(fetchedStockNew));
  } catch (error) {
    yield put(actions.fetchStockNewFail(error));
  }
}

export function* saveStockNewSaga(action) {
  yield put(actions.saveStockNewStart());
  try {
    const response = action.stockNew.id
      ? yield axios.put(action.stockNew.id, action.stockNew)
      : yield axios.post("", action.stockNew);
    const stockNew = response.data;
    yield put(actions.saveStockNewSuccess(stockNew));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockNewFail(error));
  }
}

export function* deleteStockNewSaga(action) {
  yield put(actions.deleteStockNewStart());
  try {
    const response = yield axios.delete(action.stockNew.id, action.stockNew);
    yield put(actions.deleteStockNewSuccess(action.stockNew));
    yield put(actions.fetchStockNews());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockNewFail(error));
  }
}
//--exportFunctions

export function* watchStockNew() {
  yield takeEvery(actionTypes.FETCH_STOCK_NEWS, fetchStockNewsSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_NEW, fetchStockNewSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_NEW, saveStockNewSaga);
  yield takeEvery(actionTypes.DELETE_STOCK_NEW, deleteStockNewSaga);
  //--yield
}
