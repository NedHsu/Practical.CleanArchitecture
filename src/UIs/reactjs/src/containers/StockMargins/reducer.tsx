import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockmargins: [],
  stockmargin: {
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

/// StockMargins
const fetchStockMarginsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockMarginsSuccess = (state, action) => {
  return updateObject(state, {
    stockmargins: action.stockmargins,
    loading: false,
  });
};

const fetchStockMarginsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockMargins

/// StockMargin
const fetchStockMarginStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockMarginSuccess = (state, action) => {
  return updateObject(state, {
    stockmargin: action.stockmargin,
    loading: false,
  });
};

const fetchStockMarginFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockMargin

const saveStockMarginStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockMarginSuccess = (state, action) => {
  return updateObject(state, {
    stockmargin: action.stockmargin,
    loading: false,
    saved: true,
  });
};

const saveStockMarginFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MARGINS_START:
      return fetchStockMarginsStart(state, action);
    case actionTypes.FETCH_MARGINS_SUCCESS:
      return fetchStockMarginsSuccess(state, action);
    case actionTypes.FETCH_MARGINS_FAIL:
      return fetchStockMarginsFail(state, action);
    case actionTypes.FETCH_MARGIN_START:
      return fetchStockMarginStart(state, action);
    case actionTypes.FETCH_MARGIN_SUCCESS:
      return fetchStockMarginSuccess(state, action);
    case actionTypes.FETCH_MARGIN_FAIL:
      return fetchStockMarginFail(state, action);
    case actionTypes.UPDATE_MARGIN:
      return updateObject(state, { stockmargin: action.stockmargin });
    case actionTypes.RESET_MARGIN:
      return updateObject(state, initialState);
    case actionTypes.SAVE_MARGIN_START:
      return saveStockMarginStart(state, action);
    case actionTypes.SAVE_MARGIN_SUCCESS:
      return saveStockMarginSuccess(state, action);
    case actionTypes.SAVE_MARGIN_FAIL:
      return saveStockMarginFail(state, action);
    case actionTypes.DELETE_MARGIN_START:
      return updateObject(state, {
        stockmargin: action.stockmargin,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_MARGIN_SUCCESS:
      return updateObject(state, {
        stockmargin: initialState.stockmargin,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_MARGIN_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_MARGIN_AUDIT_LOGS_START:
      return updateObject(state, {
        stockmargin: action.stockmargin,
        loading: true,
      });
    case actionTypes.FETCH_MARGIN_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_MARGIN_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
