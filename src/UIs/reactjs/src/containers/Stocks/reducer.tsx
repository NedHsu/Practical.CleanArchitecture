import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stocks: new Array<any>(),
  stockfunders: [],
  stockRevenues: [],
  stockProfits: [],
  totalPage: 0,
  totalCount: 0,
  stock: {
    name: "",
    code: "",
    description: "",
  },
  industrys: [],
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
  stockOptions: [],
  optionsLoading: false,
};

/// Stocks
const fetchStocksStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStocksSuccess = (state, action) => {
  return updateObject(state, {
    stocks: action.stocks,
    loading: false,
    totalPage: action.totalPage,
    totalCount: action.totalCount,
  });
};

const fetchGroupStocksSuccess = (state, action) => {
  return updateObject(state, {
    stocks: action.stocks,
    loading: false,
  });
};

const fetchStocksFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchStockOptionsStart = (state, action) => {
  return updateObject(state, { optionsLoading: true });
};

const fetchStockOptionsSuccess = (state, action) => {
  return updateObject(state, {
    stockOptions: action.stocks,
    optionsLoading: false,
  });
};

const fetchStockOptionsFail = (state, action) => {
  return updateObject(state, { optionsLoading: false });
};
/// Stocks

/// StockFunders
const fetchStockFundersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockFundersSuccess = (state, action) => {
  return updateObject(state, {
    stockfunders: action.stockfunders,
    loading: false,
    totalPage: action.totalPage,
    totalCount: action.totalCount,
  });
};

const fetchStockFundersFail = (state, action) => {
  return updateObject(state, { loading: false });
};
/// StockFunders

/// StockRevenues
const fetchStockRevenuesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockRevenuesSuccess = (state, action) => {
  return updateObject(state, {
    stockRevenues: action.stockRevenues,
    loading: false,
    totalPage: action.totalPage,
    totalCount: action.totalCount,
  });
};

const fetchStockRevenuesFail = (state, action) => {
  return updateObject(state, { loading: false });
};
/// StockRevenues

/// StockProfits
const fetchStockProfitsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockProfitsSuccess = (state, action) => {
  return updateObject(state, {
    stockProfits: action.stockProfits,
    loading: false,
    totalPage: action.totalPage,
    totalCount: action.totalCount,
  });
};

const fetchStockProfitsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
/// StockProfits

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
    case actionTypes.FETCH_GROUP_STOCKS_SUCCESS:
      return fetchGroupStocksSuccess(state, action);
    case actionTypes.FETCH_STOCKS_FAIL:
      return fetchStocksFail(state, action);
    case actionTypes.FETCH_STOCK_OPTIONS_START:
      return fetchStockOptionsStart(state, action);
    case actionTypes.FETCH_STOCK_OPTIONS_SUCCESS:
      return fetchStockOptionsSuccess(state, action);
    case actionTypes.FETCH_STOCK_OPTIONS_FAIL:
      return fetchStockOptionsFail(state, action);
    case actionTypes.FETCH_STOCK_START:
      return fetchStockStart(state, action);
    case actionTypes.FETCH_STOCK_SUCCESS:
      return fetchStockSuccess(state, action);
    case actionTypes.FETCH_STOCK_FUNDERS_START:
      return fetchStockFundersStart(state, action);
    case actionTypes.FETCH_STOCK_FUNDERS_SUCCESS:
      return fetchStockFundersSuccess(state, action);
    case actionTypes.FETCH_STOCK_FUNDERS_FAIL:
      return fetchStockFundersFail(state, action);
    case actionTypes.FETCH_STOCK_REVENUES_START:
      return fetchStockRevenuesStart(state, action);
    case actionTypes.FETCH_STOCK_REVENUES_SUCCESS:
      return fetchStockRevenuesSuccess(state, action);
    case actionTypes.FETCH_STOCK_REVENUES_FAIL:
      return fetchStockRevenuesFail(state, action);
    case actionTypes.FETCH_STOCK_PROFITS_START:
      return fetchStockProfitsStart(state, action);
    case actionTypes.FETCH_STOCK_PROFITS_SUCCESS:
      return fetchStockProfitsSuccess(state, action);
    case actionTypes.FETCH_STOCK_PROFITS_FAIL:
      return fetchStockProfitsFail(state, action);
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
    case actionTypes.REMOVE_LIST_STOCK:
      return updateObject(state, {
        stocks: state.stocks.filter(x => x.code !== action.stockCode)
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
