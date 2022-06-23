import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockGroupItems: [],
  stockGroupItem: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  deleting: false,
  saved: false,
  deleted: false,
  error: null,
};

/// StockGroupItems
const fetchStockGroupItemsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockGroupItemsSuccess = (state, action) => {
  return updateObject(state, {
    stockGroupItems: action.stockGroupItems,
    loading: false,
  });
};

const fetchStockGroupItemsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockGroupItems

/// StockGroupItem
const fetchStockGroupItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockGroupItemSuccess = (state, action) => {
  return updateObject(state, {
    stockGroupItem: action.stockGroupItem,
    loading: false,
  });
};

const fetchStockGroupItemFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockGroupItem

const saveStockGroupItemStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockGroupItemSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    saved: true,
  });
};

const saveStockGroupItemFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

//--functions

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_GROUP_ITEMS_START:
      return fetchStockGroupItemsStart(state, action);
    case actionTypes.FETCH_STOCK_GROUP_ITEMS_SUCCESS:
      return fetchStockGroupItemsSuccess(state, action);
    case actionTypes.FETCH_STOCK_GROUP_ITEMS_FAIL:
    case actionTypes.FETCH_STOCK_GROUP_ITEM_START:
      return fetchStockGroupItemStart(state, action);
    case actionTypes.FETCH_STOCK_GROUP_ITEM_SUCCESS:
      return fetchStockGroupItemSuccess(state, action);
    case actionTypes.FETCH_STOCK_GROUP_ITEM_FAIL:
      return fetchStockGroupItemFail(state, action);
    case actionTypes.UPDATE_STOCK_GROUP_ITEM:
      return updateObject(state, { stockGroupItem: action.stockGroupItem });
    case actionTypes.RESET_STOCK_GROUP_ITEM:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_GROUP_ITEM_START:
      return saveStockGroupItemStart(state, action);
    case actionTypes.SAVE_STOCK_GROUP_ITEM_SUCCESS:
      return saveStockGroupItemSuccess(state, action);
    case actionTypes.SAVE_STOCK_GROUP_ITEM_FAIL:
      return saveStockGroupItemFail(state, action);
    case actionTypes.DELETE_STOCK_GROUP_ITEM_START:
      return updateObject(state, {
        stockGroupItem: action.stockGroupItem,
        deleting: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_GROUP_ITEM_SUCCESS:
      return updateObject(state, {
        deleting: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_GROUP_ITEM_FAIL:
      return updateObject(state, {
        error: action.error,
        deleting: false,
        deleted: false,
      });
    case actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_START:
      return updateObject(state, {
        stockGroupItem: action.stockGroupItem,
        loading: true,
      });
    case actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    //--case
    default:
      return state;
  }
};

export default reducer;
