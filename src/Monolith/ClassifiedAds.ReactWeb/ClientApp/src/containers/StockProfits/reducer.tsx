import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockProfits: [],
  stockProfit: {
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

/// StockProfits
const fetchStockProfitsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockProfitsSuccess = (state, action) => {
  return updateObject(state, {
    stockProfits: action.stockProfits,
    loading: false,
  });
};

const fetchStockProfitsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockProfits

/// StockProfit
const fetchStockProfitStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockProfitSuccess = (state, action) => {
  return updateObject(state, {
    stockProfit: action.stockProfit,
    loading: false,
  });
};

const fetchStockProfitFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockProfit

const saveStockProfitStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockProfitSuccess = (state, action) => {
  return updateObject(state, {
    stockProfit: action.stockProfit,
    loading: false,
    saved: true,
  });
};

const saveStockProfitFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFITS_START:
      return fetchStockProfitsStart(state, action);
    case actionTypes.FETCH_PROFITS_SUCCESS:
      return fetchStockProfitsSuccess(state, action);
    case actionTypes.FETCH_PROFITS_FAIL:
      return fetchStockProfitsFail(state, action);
    case actionTypes.FETCH_PROFIT_START:
      return fetchStockProfitStart(state, action);
    case actionTypes.FETCH_PROFIT_SUCCESS:
      return fetchStockProfitSuccess(state, action);
    case actionTypes.FETCH_PROFIT_FAIL:
      return fetchStockProfitFail(state, action);
    case actionTypes.UPDATE_PROFIT:
      return updateObject(state, { stockProfit: action.stockProfit });
    case actionTypes.RESET_PROFIT:
      return updateObject(state, initialState);
    case actionTypes.SAVE_PROFIT_START:
      return saveStockProfitStart(state, action);
    case actionTypes.SAVE_PROFIT_SUCCESS:
      return saveStockProfitSuccess(state, action);
    case actionTypes.SAVE_PROFIT_FAIL:
      return saveStockProfitFail(state, action);
    case actionTypes.DELETE_PROFIT_START:
      return updateObject(state, {
        stockProfit: action.stockProfit,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_PROFIT_SUCCESS:
      return updateObject(state, {
        stockProfit: initialState.stockProfit,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_PROFIT_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    default:
      return state;
  }
};

export default reducer;
