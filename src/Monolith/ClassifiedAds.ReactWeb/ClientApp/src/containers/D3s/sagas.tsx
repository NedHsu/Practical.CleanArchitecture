import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchD3sSaga(action) {
  yield put(actions.fetchD3sStart());
  try {
    const response = yield axios.get("");
    const fetchedD3s = response.data;
    yield put(actions.fetchD3sSuccess(fetchedD3s));
  } catch (error) {
    yield put(actions.fetchD3sFail(error));
  }
}

export function* fetchD3Saga(action) {
  yield put(actions.fetchD3Start());
  try {
    const response = yield axios.get(action.id);
    const fetchedD3 = response.data;
    yield put(actions.fetchD3Success(fetchedD3));
  } catch (error) {
    yield put(actions.fetchD3Fail(error));
  }
}

export function* watchD3() {
  yield takeEvery(actionTypes.FETCH_D3S, fetchD3sSaga);
  yield takeEvery(actionTypes.FETCH_D3, fetchD3Saga);
}
