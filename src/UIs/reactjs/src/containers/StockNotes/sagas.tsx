import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { urlParams } from "../../shared/utility";

export function* fetchAllStockNotesSaga(action) {
  yield put(actions.fetchStockNotesStart({}));
  try {
    const response = yield axios.get("paged" + urlParams(action.options));
    const fetchedStockNotes = response.data;
    yield put(actions.fetchStockNotePagedSuccess(fetchedStockNotes));
  } catch (error) {
    yield put(actions.fetchStockNotesFail(error));
  }
}

export function* fetchStockNotesSaga(action) {
  yield put(actions.fetchStockNotesStart(action.stock));
  try {
    const response = yield axios.get(`?code=${action.stock.code}`);
    const fetchedStockNotes = response.data;
    yield put(actions.fetchStockNotesSuccess(fetchedStockNotes));
  } catch (error) {
    yield put(actions.fetchStockNotesFail(error));
  }
}

export function* fetchStockNoteSaga(action) {
  yield put(actions.fetchStockNoteStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedStockNote = response.data;
    yield put(actions.fetchStockNoteSuccess(fetchedStockNote));
  } catch (error) {
    yield put(actions.fetchStockNoteFail(error));
  }
}

export function* saveStockNoteSaga(action) {
  yield put(actions.saveStockNoteStart());
  try {
    const response = action.stockNote.id
      ? yield axios.put(action.stockNote.id, action.stockNote)
      : yield axios.post("", action.stockNote);
    const stockNote = response.data;
    yield put(actions.saveStockNoteSuccess(stockNote));
  } catch (error) {
    console.log(error);
    yield put(actions.saveStockNoteFail(error));
  }
}

export function* deleteStockNoteSaga(action) {
  yield put(actions.deleteStockNoteStart());
  try {
    const response = yield axios.delete(action.stockNote.id, action.stockNote);
    yield put(actions.deleteStockNoteSuccess(action.stockNote));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteStockNoteFail(error));
  }
}

export function* fetchAuditLogsSaga(action) {
  yield put(actions.fetchAuditLogsStart());
  try {
    const response = yield axios.get(action.stockNote.id + "/auditLogs");
    const fetchedAuditLogs = response.data;
    yield put(actions.fetchAuditLogsSuccess(fetchedAuditLogs));
  } catch (error) {
    yield put(actions.fetchAuditLogsFail(error));
  }
}

export function* watchStockNote() {
  yield takeEvery(actionTypes.FETCH_ALL_STOCK_NOTES, fetchAllStockNotesSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_NOTES, fetchStockNotesSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_NOTE, fetchStockNoteSaga);
  yield takeEvery(actionTypes.SAVE_STOCK_NOTE, saveStockNoteSaga);
  yield takeEvery(actionTypes.DELETE_STOCK_NOTE, deleteStockNoteSaga);
  yield takeEvery(actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS, fetchAuditLogsSaga);
}
