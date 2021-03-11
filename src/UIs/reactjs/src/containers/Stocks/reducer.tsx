import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stocks: [],
  stock: {
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

/// Stocks
const fetchStocksStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStocksSuccess = (state, action) => {
  return updateObject(state, {
    stocks: action.stocks?.sort((a, b) => { return 0 }),
    loading: false,
  });
};

const fetchStocksFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Stocks

/// Stock
const fetchStockStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockSuccess = (state, action) => {
  return updateObject(state, {
    stock: action.stock,
    loading: false,
  });
};

const fetchStockFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Stock

const saveStockStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockSuccess = (state, action) => {
  return updateObject(state, {
    stock: action.stock,
    loading: false,
    saved: true,
  });
};

const saveStockFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCKS_START:
      return fetchStocksStart(state, action);
    case actionTypes.FETCH_STOCKS_SUCCESS:
      return fetchStocksSuccess(state, action);
    case actionTypes.FETCH_STOCKS_FAIL:
      return fetchStocksFail(state, action);
    case actionTypes.FETCH_STOCK_START:
      return fetchStockStart(state, action);
    case actionTypes.FETCH_STOCK_SUCCESS:
      return fetchStockSuccess(state, action);
    case actionTypes.FETCH_STOCK_FAIL:
      return fetchStockFail(state, action);
    case actionTypes.UPDATE_STOCK:
      return updateObject(state, { stock: action.stock });
    case actionTypes.RESET_STOCK:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_START:
      return saveStockStart(state, action);
    case actionTypes.SAVE_STOCK_SUCCESS:
      return saveStockSuccess(state, action);
    case actionTypes.SAVE_STOCK_FAIL:
      return saveStockFail(state, action);
    case actionTypes.DELETE_STOCK_START:
      return updateObject(state, {
        stock: action.stock,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_SUCCESS:
      return updateObject(state, {
        stock: initialState.stock,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_STOCK_AUDIT_LOGS_START:
      return updateObject(state, {
        stock: action.stock,
        loading: true,
      });
    case actionTypes.FETCH_STOCK_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_STOCK_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
