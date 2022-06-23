import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockFundersSaga(action) {
  yield put(actions.fetchStockFundersStart());
  try {
    const response = yield axios.get(action.code, { params: action.options });
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
    const response = action.stockFunder.id
      ? yield axios.put(action.stockFunder.id, action.stockFunder)
      : yield axios.post("", action.stockFunder);
    const stockFunder = response.data;
    yield put(actions.saveStockFunderSuccess(stockFunder));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockFunderFail(error));
  }
}

export function* deleteStockFunderSaga(action) {
  yield put(actions.deleteStockFunderStart());
  try {
    const response = yield axios.delete(action.stockFunder.id, action.stockFunder);
    yield put(actions.deleteStockFunderSuccess(action.stockFunder));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockFunderFail(error));
  }
}

//--exportFunctions
export function* fetchFunderScoresSaga(action) {
  yield put(actions.fetchFunderScoresStart());
  try {
    const response = yield axios.get("score", { params: action.options });
    const fetchedFunderScores = response.data;
    yield put(actions.fetchFunderScoresSuccess(fetchedFunderScores));
  } catch (error) {
    yield put(actions.fetchFunderScoresFail(error));
  }
}

export function* watchStockFunder() {
  yield takeEvery(actionTypes.FETCH_FUNDERS, fetchStockFundersSaga);
  yield takeEvery(actionTypes.FETCH_FUNDER, fetchStockFunderSaga);
  yield takeEvery(actionTypes.SAVE_FUNDER, saveStockFunderSaga);
  yield takeEvery(actionTypes.DELETE_FUNDER, deleteStockFunderSaga);
  //--yield
  yield takeEvery(actionTypes.FETCH_FUNDER_SCORES, fetchFunderScoresSaga);
}
