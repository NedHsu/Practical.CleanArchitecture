import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockgroups: [],
  stockgroup: {
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

/// StockGroups
const fetchStockGroupsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockGroupsSuccess = (state, action) => {
  return updateObject(state, {
    stockgroups: action.stockgroups,
    loading: false,
  });
};

const fetchStockGroupsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockGroups

/// StockGroup
const fetchStockGroupStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockGroupSuccess = (state, action) => {
  return updateObject(state, {
    stockgroup: action.stockgroup,
    loading: false,
  });
};

const fetchStockGroupFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockGroup

const saveStockGroupStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockGroupSuccess = (state, action) => {
  return updateObject(state, {
    stockgroup: action.stockgroup,
    loading: false,
    saved: true,
  });
};

const saveStockGroupFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_GROUPS_START:
      return fetchStockGroupsStart(state, action);
    case actionTypes.FETCH_STOCK_GROUPS_SUCCESS:
      return fetchStockGroupsSuccess(state, action);
    case actionTypes.FETCH_STOCK_GROUPS_FAIL:
    case actionTypes.FETCH_STOCK_GROUP_START:
      return fetchStockGroupStart(state, action);
    case actionTypes.FETCH_STOCK_GROUP_SUCCESS:
      return fetchStockGroupSuccess(state, action);
    case actionTypes.FETCH_STOCK_GROUP_FAIL:
      return fetchStockGroupFail(state, action);
    case actionTypes.UPDATE_STOCK_GROUP:
      return updateObject(state, { stockgroup: action.stockgroup });
    case actionTypes.RESET_STOCK_GROUP:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_GROUP_START:
      return saveStockGroupStart(state, action);
    case actionTypes.SAVE_STOCK_GROUP_SUCCESS:
      return saveStockGroupSuccess(state, action);
    case actionTypes.SAVE_STOCK_GROUP_FAIL:
      return saveStockGroupFail(state, action);
    case actionTypes.DELETE_STOCK_GROUP_START:
      return updateObject(state, {
        stockgroup: action.stockgroup,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_GROUP_SUCCESS:
      return updateObject(state, {
        stockgroup: initialState.stockgroup,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_GROUP_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_START:
      return updateObject(state, {
        stockgroup: action.stockgroup,
        loading: true,
      });
    case actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
