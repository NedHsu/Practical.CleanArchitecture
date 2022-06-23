import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockdays: [],
  stockday: {
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

/// StockDays
const fetchStockDaysStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStocksDaysSuccess = (state, action) => {
  return updateObject(state, {
    stockDayMaps: {
      ...state.stockDayMaps,
      ...action.stockDayMaps,
    },
    loading: false,
  });
};

const fetchStockDaysSuccess = (state, action) => {
  return updateObject(state, {
    stockDays: action.stockDays,
    loading: false,
  });
};

const fetchStockDaysFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockDays

/// StockDay
const fetchStockDayStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockDaySuccess = (state, action) => {
  return updateObject(state, {
    stockday: action.stockday,
    loading: false,
  });
};

const fetchStockDayFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockDay

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_DAYS_START:
      return fetchStockDaysStart(state, action);
    case actionTypes.FETCH_STOCK_DAYS_SUCCESS:
      return fetchStockDaysSuccess(state, action);
    case actionTypes.FETCH_STOCKS_DAYS_SUCCESS:
      return fetchStocksDaysSuccess(state, action);
    case actionTypes.FETCH_STOCK_DAYS_FAIL:
      return fetchStockDaysFail(state, action);
    case actionTypes.FETCH_STOCK_DAY_START:
      return fetchStockDayStart(state, action);
    case actionTypes.FETCH_STOCK_DAY_SUCCESS:
      return fetchStockDaySuccess(state, action);
    case actionTypes.FETCH_STOCK_DAY_FAIL:
      return fetchStockDayFail(state, action);
    case actionTypes.RESET_STOCK_DAY:
      return updateObject(state, initialState);
    default:
      return state;
  }
};

export default reducer;
