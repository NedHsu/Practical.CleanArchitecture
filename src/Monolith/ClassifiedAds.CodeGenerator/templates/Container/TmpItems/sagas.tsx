import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchTmpItemsSaga(action) {
  yield put(actions.fetchTmpItemsStart());
  try {
    const response = yield axios.get("");
    const fetchedTmpItems = response.data;
    yield put(actions.fetchTmpItemsSuccess(fetchedTmpItems));
  } catch (error) {
    yield put(actions.fetchTmpItemsFail(error));
  }
}

export function* fetchTmpItemSaga(action) {
  yield put(actions.fetchTmpItemStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedTmpItem = response.data;
    yield put(actions.fetchTmpItemSuccess(fetchedTmpItem));
  } catch (error) {
    yield put(actions.fetchTmpItemFail(error));
  }
}

export function* saveTmpItemSaga(action) {
  yield put(actions.saveTmpItemStart());
  try {
    const response = action.tmpItem.id
      ? yield axios.put(action.tmpItem.id, action.tmpItem)
      : yield axios.post("", action.tmpItem);
    const tmpItem = response.data;
    yield put(actions.saveTmpItemSuccess(tmpItem));
  } catch (error) {
    console.log(error);
    yield put(actions.saveTmpItemFail(error));
  }
}

export function* deleteTmpItemSaga(action) {
  yield put(actions.deleteTmpItemStart());
  try {
    const response = yield axios.delete(action.tmpItem.id, action.tmpItem);
    yield put(actions.deleteTmpItemSuccess(action.tmpItem));
    yield put(actions.fetchTmpItems());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteTmpItemFail(error));
  }
}

export function* watchTmpItem() {
  yield takeEvery(actionTypes.FETCH_TMPITEMS, fetchTmpItemsSaga);
  yield takeEvery(actionTypes.FETCH_TMPITEM, fetchTmpItemSaga);
  yield takeEvery(actionTypes.SAVE_TMPITEM, saveTmpItemSaga);
  yield takeEvery(actionTypes.DELETE_TMPITEM, deleteTmpItemSaga);
}
