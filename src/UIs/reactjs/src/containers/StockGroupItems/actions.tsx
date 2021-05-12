import * as actionTypes from "./actionTypes";

/// STOCK_GROUP_ITEMS
export const fetchStockGroupItemsSuccess = (stockGroupItems) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEMS_SUCCESS,
    stockGroupItems: stockGroupItems,
  };
};

export const fetchStockGroupItemsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEMS_FAIL,
    error: error,
  };
};

export const fetchStockGroupItemsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEMS_START,
  };
};

export const fetchStockGroupItems = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEMS,
    stock: stock,
  };
};
/// STOCK_GROUP_ITEMS

/// STOCK_GROUP_ITEM
export const fetchStockGroupItemSuccess = (stockGroupItem) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_SUCCESS,
    stockGroupItem: stockGroupItem,
  };
};

export const fetchStockGroupItemFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_FAIL,
    error: error,
  };
};

export const fetchStockGroupItemStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_START,
  };
};

export const fetchStockGroupItem = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM,
    id: id,
  };
};
/// STOCK_GROUP_ITEM

/// UPDATE STOCK_GROUP_ITEM
export const updateStockGroupItem = (stockGroupItem) => {
  return {
    type: actionTypes.UPDATE_STOCK_GROUP_ITEM,
    stockGroupItem: stockGroupItem,
  };
};

export const resetStockGroupItem = () => {
  return {
    type: actionTypes.RESET_STOCK_GROUP_ITEM,
  };
};
/// UPDATE STOCK_GROUP_ITEM

/// SAVE STOCK_GROUP_ITEM
export const saveStockGroupItemSuccess = () => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_ITEM_SUCCESS,
  };
};

export const saveStockGroupItemFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_ITEM_FAIL,
    error: error,
  };
};

export const saveStockGroupItemStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_ITEM_START,
  };
};

export const saveStockGroupItems = (stockCode, groupIds) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_ITEMS,
    stockCode: stockCode,
    groupIds: groupIds,
  };
};

export const saveStockGroupItem = (stockGroupItem) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_ITEM,
    stockGroupItem: stockGroupItem,
  };
};
/// SAVE STOCK_GROUP_ITEM

/// DELETE STOCK_GROUP_ITEM
export const deleteStockGroupItemSuccess = () => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_ITEM_SUCCESS,
  };
};

export const deleteStockGroupItemFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_ITEM_FAIL,
    error: error,
  };
};

export const deleteStockGroupItemStart = (stockGroupItem) => {
  return {
    stockGroupItem: stockGroupItem,
    type: actionTypes.DELETE_STOCK_GROUP_ITEM_START,
  };
};

export const deleteStockGroupItem = (stockGroupItem) => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_ITEM,
    stockGroupItem: stockGroupItem,
  };
};
/// DELETE STOCK_GROUP_ITEM

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stockGroupItem) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_ITEM_AUDIT_LOGS,
    stockGroupItem: stockGroupItem,
  };
};
/// VIEW AUDIT LOGS
