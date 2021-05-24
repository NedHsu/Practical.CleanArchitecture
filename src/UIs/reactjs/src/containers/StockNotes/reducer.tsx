import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";
console.log("reducer");

const initialState = {
  stockNotes: [],
  stockNote: {
    stockCode: "",
    title: "",
    contents: "",
  },
  stock: {
    code: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// StockNotes
const initStockNote = (stockCode) => {
  return Object.assign(initialState.stockNote, { stockCode: stockCode });
}


const fetchStockNotesStart = (state, action) => {
  return updateObject(state, { loading: true, stock: action.stock });
};

const fetchStockNotesSuccess = (state, action) => {

  return updateObject(state, {
    stockNotes: action.stockNotes,
    loading: false,
  });
};

const fetchStockNotePagedSuccess = (state, action) => {

  return updateObject(state, {
    stockNotes: action.stockPaged.items,
    totalPages: action.stockPaged.totalPages,
    pageIndex: action.stockPaged.pageIndex,
    totalCount: action.stockPaged.totalCount,
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
    stockNote: action.stockNote,
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
  var stockNotes = state.stockNotes;
  var oldNote = stockNotes.find(x => x.id === action.stockNote.id);
  if (oldNote) {
    Object.assign(oldNote, action.stockNote)
  } else {
    stockNotes = [action.stockNote, ...state.stockNotes]
  }
  console.log(stockNotes);
  return updateObject(state, {
    stockNote: action.stockNote,
    loading: false,
    saved: true,
    stockNotes: stockNotes,
  });
};

const saveStockNoteFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const deleteStockNoteSuccess = (state, action) => {
  return updateObject(state, {
    stockNote: initStockNote(state.stock.code),
    loading: false,
    deleted: true,
    stockNotes: state.stockNotes.filter(x => x.id !== action.stockNote.id)
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_NOTES_START:
      return fetchStockNotesStart(state, action);
    case actionTypes.FETCH_STOCK_NOTES_SUCCESS:
      return fetchStockNotesSuccess(state, action);
    case actionTypes.FETCH_STOCK_NOTE_Paged_SUCCESS:
      return fetchStockNotePagedSuccess(state, action);
    case actionTypes.FETCH_STOCK_NOTES_FAIL:
      return fetchStockNotesFail(state, action);
    case actionTypes.FETCH_STOCK_NOTE_START:
      return fetchStockNoteStart(state, action);
    case actionTypes.FETCH_STOCK_NOTE_SUCCESS:
      return fetchStockNoteSuccess(state, action);
    case actionTypes.FETCH_STOCK_NOTE_FAIL:
      return fetchStockNoteFail(state, action);
    case actionTypes.UPDATE_STOCK_NOTE:
      return updateObject(state, { stockNote: action.stockNote });
    case actionTypes.RESET_STOCK_NOTE:
      return updateObject(state, { stockNote: initStockNote(state.stock.code) });
    case actionTypes.SAVE_STOCK_NOTE_START:
      return saveStockNoteStart(state, action);
    case actionTypes.SAVE_STOCK_NOTE_SUCCESS:
      return saveStockNoteSuccess(state, action);
    case actionTypes.SAVE_STOCK_NOTE_FAIL:
      return saveStockNoteFail(state, action);
    case actionTypes.DELETE_STOCK_NOTE_START:
      return updateObject(state, {
        stockNote: action.stockNote,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_NOTE_SUCCESS:
      return deleteStockNoteSuccess(state, action);
    case actionTypes.DELETE_STOCK_NOTE_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_START:
      return updateObject(state, {
        stockNote: action.stockNote,
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
