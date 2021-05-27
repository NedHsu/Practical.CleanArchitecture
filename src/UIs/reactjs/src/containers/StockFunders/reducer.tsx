import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockfunders: [],
  stockfunder: {
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

/// StockFunders
const fetchStockFundersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockFundersSuccess = (state, action) => {
  return updateObject(state, {
    stockfunders: action.stockfunders,
    loading: false,
  });
};

const fetchStockFundersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockFunders

/// StockFunder
const fetchStockFunderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockFunderSuccess = (state, action) => {
  return updateObject(state, {
    stockfunder: action.stockfunder,
    loading: false,
  });
};

const fetchStockFunderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockFunder

const saveStockFunderStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockFunderSuccess = (state, action) => {
  return updateObject(state, {
    stockfunder: action.stockfunder,
    loading: false,
    saved: true,
  });
};

const saveStockFunderFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FUNDERS_START:
      return fetchStockFundersStart(state, action);
    case actionTypes.FETCH_FUNDERS_SUCCESS:
      return fetchStockFundersSuccess(state, action);
    case actionTypes.FETCH_FUNDERS_FAIL:
      return fetchStockFundersFail(state, action);
    case actionTypes.FETCH_FUNDER_START:
      return fetchStockFunderStart(state, action);
    case actionTypes.FETCH_FUNDER_SUCCESS:
      return fetchStockFunderSuccess(state, action);
    case actionTypes.FETCH_FUNDER_FAIL:
      return fetchStockFunderFail(state, action);
    case actionTypes.UPDATE_FUNDER:
      return updateObject(state, { stockfunder: action.stockfunder });
    case actionTypes.RESET_FUNDER:
      return updateObject(state, initialState);
    case actionTypes.SAVE_FUNDER_START:
      return saveStockFunderStart(state, action);
    case actionTypes.SAVE_FUNDER_SUCCESS:
      return saveStockFunderSuccess(state, action);
    case actionTypes.SAVE_FUNDER_FAIL:
      return saveStockFunderFail(state, action);
    case actionTypes.DELETE_FUNDER_START:
      return updateObject(state, {
        stockfunder: action.stockfunder,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_FUNDER_SUCCESS:
      return updateObject(state, {
        stockfunder: initialState.stockfunder,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_FUNDER_FAIL:
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
