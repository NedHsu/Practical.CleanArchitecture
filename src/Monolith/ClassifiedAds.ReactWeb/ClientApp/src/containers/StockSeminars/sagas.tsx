import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockSeminarsSaga(action) {
  yield put(actions.fetchStockSeminarsStart());
  try {
    const response = yield axios.get("", { params: action.options });
    const fetchedStockSeminars = response.data;
    yield put(actions.fetchStockSeminarsSuccess(fetchedStockSeminars));
  } catch (error) {
    yield put(actions.fetchStockSeminarsFail(error));
  }
}

export function* fetchStockSeminarSaga(action) {
  yield put(actions.fetchStockSeminarStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockSeminar = response.data;
    yield put(actions.fetchStockSeminarSuccess(fetchedStockSeminar));
  } catch (error) {
    yield put(actions.fetchStockSeminarFail(error));
  }
}

export function* saveStockSeminarSaga(action) {
  yield put(actions.saveStockSeminarStart());
  try {
    const response = action.stockSeminar.id
      ? yield axios.put(action.stockSeminar.id, action.stockSeminar)
      : yield axios.post("", action.stockSeminar);
    const stockSeminar = response.data;
    yield put(actions.saveStockSeminarSuccess(stockSeminar));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockSeminarFail(error));
  }
}

export function* deleteStockSeminarSaga(action) {
  yield put(actions.deleteStockSeminarStart());
  try {
    const response = yield axios.delete(action.stockSeminar.id, action.stockSeminar);
    yield put(actions.deleteStockSeminarSuccess(action.stockSeminar));
    yield put(actions.fetchStockSeminars({}));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockSeminarFail(error));
  }
}

export function* watchStockSeminar() {
  yield takeEvery(actionTypes.FETCH_SEMINARS, fetchStockSeminarsSaga);
  yield takeEvery(actionTypes.FETCH_SEMINAR, fetchStockSeminarSaga);
  yield takeEvery(actionTypes.SAVE_SEMINAR, saveStockSeminarSaga);
  yield takeEvery(actionTypes.DELETE_SEMINAR, deleteStockSeminarSaga);
}
