import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockNews: [],
  stockNew: {
    name: "",
    code: "",
    description: "",
  },
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// StockNews
const fetchStockNewsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockNewsSuccess = (state, action) => {
  return updateObject(state, {
    stockNews: action.stockNews,
    loading: false,
  });
};

const fetchStockNewsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockNews

/// StockNew
const fetchStockNewStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockNewSuccess = (state, action) => {
  return updateObject(state, {
    stockNew: action.stockNew,
    loading: false,
  });
};

const fetchStockNewFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockNew

const saveStockNewStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockNewSuccess = (state, action) => {
  return updateObject(state, {
    stockNew: action.stockNew,
    loading: false,
    saved: true,
  });
};

const saveStockNewFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};
//--functions

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_NEWS_START:
      return fetchStockNewsStart(state, action);
    case actionTypes.FETCH_STOCK_NEWS_SUCCESS:
      return fetchStockNewsSuccess(state, action);
    case actionTypes.FETCH_STOCK_NEWS_FAIL:
      return fetchStockNewsFail(state, action);
    case actionTypes.FETCH_STOCK_NEW_START:
      return fetchStockNewStart(state, action);
    case actionTypes.FETCH_STOCK_NEW_SUCCESS:
      return fetchStockNewSuccess(state, action);
    case actionTypes.FETCH_STOCK_NEW_FAIL:
      return fetchStockNewFail(state, action);
    case actionTypes.UPDATE_STOCK_NEW:
      return updateObject(state, { stockNew: action.stockNew });
    case actionTypes.RESET_STOCK_NEW:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_NEW_START:
      return saveStockNewStart(state, action);
    case actionTypes.SAVE_STOCK_NEW_SUCCESS:
      return saveStockNewSuccess(state, action);
    case actionTypes.SAVE_STOCK_NEW_FAIL:
      return saveStockNewFail(state, action);
    case actionTypes.DELETE_STOCK_NEW_START:
      return updateObject(state, {
        stockNew: action.stockNew,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_NEW_SUCCESS:
      return updateObject(state, {
        stockNew: initialState.stockNew,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_NEW_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    //--case
    default:
      return state;
  }
};

export default reducer;
