import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockRevenues: [],
  stockRevenue: {
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

/// StockRevenues
const fetchStockRevenuesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockRevenuesSuccess = (state, action) => {
  return updateObject(state, {
    stockRevenues: action.stockRevenues,
    loading: false,
  });
};

const fetchStockRevenuesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockRevenues

/// StockRevenue
const fetchStockRevenueStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockRevenueSuccess = (state, action) => {
  return updateObject(state, {
    stockRevenue: action.stockRevenue,
    loading: false,
  });
};

const fetchStockRevenueFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockRevenue

const saveStockRevenueStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockRevenueSuccess = (state, action) => {
  return updateObject(state, {
    stockRevenue: action.stockRevenue,
    loading: false,
    saved: true,
  });
};

const saveStockRevenueFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVENUES_START:
      return fetchStockRevenuesStart(state, action);
    case actionTypes.FETCH_REVENUES_SUCCESS:
      return fetchStockRevenuesSuccess(state, action);
    case actionTypes.FETCH_REVENUES_FAIL:
      return fetchStockRevenuesFail(state, action);
    case actionTypes.FETCH_REVENUE_START:
      return fetchStockRevenueStart(state, action);
    case actionTypes.FETCH_REVENUE_SUCCESS:
      return fetchStockRevenueSuccess(state, action);
    case actionTypes.FETCH_REVENUE_FAIL:
      return fetchStockRevenueFail(state, action);
    case actionTypes.UPDATE_REVENUE:
      return updateObject(state, { stockRevenue: action.stockRevenue });
    case actionTypes.RESET_REVENUE:
      return updateObject(state, initialState);
    case actionTypes.SAVE_REVENUE_START:
      return saveStockRevenueStart(state, action);
    case actionTypes.SAVE_REVENUE_SUCCESS:
      return saveStockRevenueSuccess(state, action);
    case actionTypes.SAVE_REVENUE_FAIL:
      return saveStockRevenueFail(state, action);
    case actionTypes.DELETE_REVENUE_START:
      return updateObject(state, {
        stockRevenue: action.stockRevenue,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_REVENUE_SUCCESS:
      return updateObject(state, {
        stockRevenue: initialState.stockRevenue,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_REVENUE_FAIL:
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
