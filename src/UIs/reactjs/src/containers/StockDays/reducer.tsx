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

const fetchStockDaysSuccess = (state, action) => {
  [{
    stockCode: ""
  }].reduce((a, b, i) => {
    if (!a[b.stockCode]) {
      a[b.stockCode] = [b];
    } else {
      a[b.stockCode].push(b);
    }
    return a;
  }, {});
  return updateObject(state, {
    stockdays: action.stockdays,
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
