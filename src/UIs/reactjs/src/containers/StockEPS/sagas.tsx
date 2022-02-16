import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";
import stockAxios from "../Stocks/axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockEPSesSaga(action) {
  yield put(actions.fetchStockEPSesStart());
  try {
    const response = yield stockAxios.get("EPS", { params: action.options });
    const fetchedStockEPSes = response.data;
    yield put(actions.fetchStockEPSesSuccess(fetchedStockEPSes));
  } catch (error) {
    yield put(actions.fetchStockEPSesFail(error));
  }
}

export function* fetchStockEPSSaga(action) {
  yield put(actions.fetchStockEPSStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockEPS = response.data;
    yield put(actions.fetchStockEPSSuccess(fetchedStockEPS));
  } catch (error) {
    yield put(actions.fetchStockEPSFail(error));
  }
}

export function* saveStockEPSSaga(action) {
  yield put(actions.saveStockEPSStart());
  try {
    const response = action.stockEPS.id
      ? yield axios.put("", action.stockEPS)
      : yield axios.post("", action.stockEPS);
    const stockEPS = response.data;
    yield put(actions.saveStockEPSSuccess(stockEPS));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockEPSFail(error));
  }
}

export function* deleteStockEPSSaga(action) {
  yield put(actions.deleteStockEPSStart());
  try {
    yield axios.delete(action.stockEPS.id, action.stockEPS);
    yield put(actions.deleteStockEPSSuccess(action.stockEPS));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockEPSFail(error));
  }
}
//--exportFunctions

export function* watchStockEPS() {
  yield takeEvery(actionTypes.FETCH_STOCK_EPSSES, fetchStockEPSesSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_EPSS, fetchStockEPSSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_EPSS, saveStockEPSSaga);
  yield takeEvery(actionTypes.DELETE_STOCK_EPSS, deleteStockEPSSaga);
  //--yield
}
