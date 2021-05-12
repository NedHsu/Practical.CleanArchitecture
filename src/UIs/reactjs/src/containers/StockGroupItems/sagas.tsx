import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchStockGroupItemsSaga(action) {
  yield put(actions.fetchStockGroupItemsStart());
  try {
    const response = yield axios.get(`code/${action.stock.code}`);
    const fetchedStockGroupItems = response.data;
    yield put(actions.fetchStockGroupItemsSuccess(fetchedStockGroupItems));
  } catch (error) {
    yield put(actions.fetchStockGroupItemsFail(error));
  }
}

export function* fetchStockGroupItemSaga(action) {
  yield put(actions.fetchStockGroupItemStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockGroupItem = response.data;
    yield put(actions.fetchStockGroupItemSuccess(fetchedStockGroupItem));
  } catch (error) {
    yield put(actions.fetchStockGroupItemFail(error));
  }
}

export function* saveStockGroupItemSaga(action) {
  yield put(actions.saveStockGroupItemStart());
  try {
    const response = action.stockGroupItem.id
      ? yield axios.put(action.stockGroupItem.id, action.stockGroupItem)
      : yield axios.post("", action.stockGroupItem);
    const stockGroupItem = response.data;
    yield put(actions.saveStockGroupItemSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockGroupItemFail(error));
  }
}

export function* saveStockGroupItemsSaga(action) {
  yield put(actions.saveStockGroupItemStart());
  try {
    const response = yield axios.put(action.stockCode, action.groupIds);
    yield put(actions.saveStockGroupItemSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockGroupItemFail(error));
  }
}

export function* deleteStockGroupItemSaga(action) {
  yield put(actions.deleteStockGroupItemStart(action.stockGroupItem));
  try {
    const response = yield axios.delete(`?stockCode=${action.stockGroupItem.stockCode}&groupId=${action.stockGroupItem.groupId}`, action.stockGroupItem);
    yield put(actions.deleteStockGroupItemSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockGroupItemFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.stockGroupItem.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchStockGroupItem() {
  yield takeEvery(actionTypes.FETCH_STOCK_GROUP_ITEMS, fetchStockGroupItemsSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_GROUP_ITEM, fetchStockGroupItemSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_GROUP_ITEM, saveStockGroupItemSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_GROUP_ITEMS, saveStockGroupItemsSaga);
  yield takeEvery(actionTypes.DELETE_STOCK_GROUP_ITEM, deleteStockGroupItemSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS, fetchAuditLogsSaga);
}
