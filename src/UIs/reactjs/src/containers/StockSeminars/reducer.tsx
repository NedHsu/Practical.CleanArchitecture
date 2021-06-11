import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockSeminars: [],
  stockSeminar: {
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

/// StockSeminars
const fetchStockSeminarsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockSeminarsSuccess = (state, action) => {
  return updateObject(state, {
    stockSeminars: action.pagedStockSeminar.items,
    loading: false,
  });
};

const fetchStockSeminarsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockSeminars

/// StockSeminar
const fetchStockSeminarStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockSeminarSuccess = (state, action) => {
  return updateObject(state, {
    stockSeminar: action.stockSeminar,
    loading: false,
  });
};

const fetchStockSeminarFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockSeminar

const saveStockSeminarStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockSeminarSuccess = (state, action) => {
  return updateObject(state, {
    stockSeminar: action.stockSeminar,
    loading: false,
    saved: true,
  });
};

const saveStockSeminarFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEMINARS_START:
      return fetchStockSeminarsStart(state, action);
    case actionTypes.FETCH_SEMINARS_SUCCESS:
      return fetchStockSeminarsSuccess(state, action);
    case actionTypes.FETCH_SEMINARS_FAIL:
      return fetchStockSeminarsFail(state, action);
    case actionTypes.FETCH_SEMINAR_START:
      return fetchStockSeminarStart(state, action);
    case actionTypes.FETCH_SEMINAR_SUCCESS:
      return fetchStockSeminarSuccess(state, action);
    case actionTypes.FETCH_SEMINAR_FAIL:
      return fetchStockSeminarFail(state, action);
    case actionTypes.UPDATE_SEMINAR:
      return updateObject(state, { stockSeminar: action.stockSeminar });
    case actionTypes.RESET_SEMINAR:
      return updateObject(state, initialState);
    case actionTypes.SAVE_SEMINAR_START:
      return saveStockSeminarStart(state, action);
    case actionTypes.SAVE_SEMINAR_SUCCESS:
      return saveStockSeminarSuccess(state, action);
    case actionTypes.SAVE_SEMINAR_FAIL:
      return saveStockSeminarFail(state, action);
    case actionTypes.DELETE_SEMINAR_START:
      return updateObject(state, {
        stockSeminar: action.stockSeminar,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_SEMINAR_SUCCESS:
      return updateObject(state, {
        stockSeminar: initialState.stockSeminar,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_SEMINAR_FAIL:
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
