import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockFunders: [],
  stockFunder: {
    name: "",
    code: "",
    description: "",
  },
  funderScores: [],
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
    stockFunders: action.stockFunders,
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
    stockFunder: action.stockFunder,
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
    stockFunder: action.stockFunder,
    loading: false,
    saved: true,
  });
};

const saveStockFunderFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

//--functions
/// FunderScores
const fetchFunderScoresStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchFunderScoresSuccess = (state, action) => {
  return updateObject(state, {
    funderScores: action.funderScores,
    loading: false,
  });
};

const fetchFunderScoresFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// FunderScores

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
      return updateObject(state, { stockFunder: action.stockFunder });
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
        stockFunder: action.stockFunder,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_FUNDER_SUCCESS:
      return updateObject(state, {
        stockFunder: initialState.stockFunder,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_FUNDER_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    //--case
    case actionTypes.FETCH_FUNDER_SCORES_START:
      return fetchFunderScoresStart(state, action);
    case actionTypes.FETCH_FUNDER_SCORES_SUCCESS:
      return fetchFunderScoresSuccess(state, action);
    case actionTypes.FETCH_FUNDER_SCORES_FAIL:
      return fetchFunderScoresFail(state, action);
    default:
      return state;
  }
};

export default reducer;
