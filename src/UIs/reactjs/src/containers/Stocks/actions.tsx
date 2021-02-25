import * as actionTypes from "./actionTypes";

/// STOCKS
export const fetchStocksSuccess = (stocks) => {
  return {
    type: actionTypes.FETCH_STOCKS_SUCCESS,
    stocks: stocks,
  };
};

export const fetchStocksFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCKS_FAIL,
    error: error,
  };
};

export const fetchStocksStart = () => {
  return {
    type: actionTypes.FETCH_STOCKS_START,
  };
};

export const fetchStocks = () => {
  return {
    type: actionTypes.FETCH_STOCKS,
  };
};
/// STOCKS

/// STOCK
export const fetchStockSuccess = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_SUCCESS,
    stock: stock,
  };
};

export const fetchStockFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_FAIL,
    error: error,
  };
};

export const fetchStockStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_START,
  };
};

export const fetchStock = (id) => {
  return {
    type: actionTypes.FETCH_STOCK,
    id: id,
  };
};
/// STOCK

/// UPDATE STOCK
export const updateStock = (stock) => {
  return {
    type: actionTypes.UPDATE_STOCK,
    stock: stock,
  };
};

export const resetStock = () => {
  return {
    type: actionTypes.RESET_STOCK,
  };
};
/// UPDATE STOCK

/// SAVE STOCK
export const saveStockSuccess = (stock) => {
  return {
    type: actionTypes.SAVE_STOCK_SUCCESS,
    stock: stock,
  };
};

export const saveStockFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_FAIL,
    error: error,
  };
};

export const saveStockStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_START,
  };
};

export const saveStock = (stock) => {
  return {
    type: actionTypes.SAVE_STOCK,
    stock: stock,
  };
};
/// SAVE STOCK

/// DELETE STOCK
export const deleteStockSuccess = (stock) => {
  return {
    type: actionTypes.DELETE_STOCK_SUCCESS,
  };
};

export const deleteStockFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_FAIL,
    error: error,
  };
};

export const deleteStockStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_START,
  };
};

export const deleteStock = (stock) => {
  return {
    type: actionTypes.DELETE_STOCK,
    stock: stock,
  };
};
/// DELETE STOCK

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS,
    stock: stock,
  };
};
/// VIEW AUDIT LOGS
