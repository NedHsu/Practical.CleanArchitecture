import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stocknotes: [],
  stocknote: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// StockNotes
const fetchStockNotesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockNotesSuccess = (state, action) => {
  return updateObject(state, {
    stocknotes: action.stocknotes,
    loading: false,
  });
};

const fetchStockNotesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockNotes

/// StockNote
const fetchStockNoteStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockNoteSuccess = (state, action) => {
  return updateObject(state, {
    stocknote: action.stocknote,
    loading: false,
  });
};

const fetchStockNoteFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockNote

const saveStockNoteStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockNoteSuccess = (state, action) => {
  return updateObject(state, {
    stocknote: action.stocknote,
    loading: false,
    saved: true,
  });
};

const saveStockNoteFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_NOTES_START:
      return fetchStockNotesStart(state, action);
    case actionTypes.FETCH_STOCK_NOTES_SUCCESS:
      return fetchStockNotesSuccess(state, action);
    case actionTypes.FETCH_STOCK_NOTES_FAIL:
    case actionTypes.FETCH_STOCK_NOTE_START:
      return fetchStockNoteStart(state, action);
    case actionTypes.FETCH_STOCK_NOTE_SUCCESS:
      return fetchStockNoteSuccess(state, action);
    case actionTypes.FETCH_STOCK_NOTE_FAIL:
      return fetchStockNoteFail(state, action);
    case actionTypes.UPDATE_STOCK_NOTE:
      return updateObject(state, { stocknote: action.stocknote });
    case actionTypes.RESET_STOCK_NOTE:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_NOTE_START:
      return saveStockNoteStart(state, action);
    case actionTypes.SAVE_STOCK_NOTE_SUCCESS:
      return saveStockNoteSuccess(state, action);
    case actionTypes.SAVE_STOCK_NOTE_FAIL:
      return saveStockNoteFail(state, action);
    case actionTypes.DELETE_STOCK_NOTE_START:
      return updateObject(state, {
        stocknote: action.stocknote,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_NOTE_SUCCESS:
      return updateObject(state, {
        stocknote: initialState.stocknote,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_NOTE_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_START:
      return updateObject(state, {
        stocknote: action.stocknote,
        loading: true,
      });
    case actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
