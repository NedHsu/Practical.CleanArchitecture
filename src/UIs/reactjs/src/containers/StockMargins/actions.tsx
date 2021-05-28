import * as actionTypes from "./actionTypes";

/// MARGINS
export const fetchStockMarginsSuccess = (stockMargins) => {
  return {
    type: actionTypes.FETCH_MARGINS_SUCCESS,
    stockMargins: stockMargins,
  };
};

export const fetchStockMarginsFail = (error) => {
  return {
    type: actionTypes.FETCH_MARGINS_FAIL,
    error: error,
  };
};

export const fetchStockMarginsStart = () => {
  return {
    type: actionTypes.FETCH_MARGINS_START,
  };
};

export const fetchStockMargins = () => {
  return {
    type: actionTypes.FETCH_MARGINS,
  };
};
/// MARGINS

/// MARGIN FUNDERS
export const fetchStockMarginFundersSuccess = (stockMarginFunders) => {
  return {
    type: actionTypes.FETCH_MARGIN_FUNDERS_SUCCESS,
    stockMarginFunders: stockMarginFunders,
  };
};

export const fetchStockMarginFundersFail = (error) => {
  return {
    type: actionTypes.FETCH_MARGIN_FUNDERS_FAIL,
    error: error,
  };
};

export const fetchStockMarginFundersStart = () => {
  return {
    type: actionTypes.FETCH_MARGIN_FUNDERS_START,
  };
};

export const fetchStockMarginFunders = (options) => {
  return {
    type: actionTypes.FETCH_MARGIN_FUNDERS,
    options: options,
  };
};
/// MARGINS

/// MARGIN
export const fetchStockMarginSuccess = (stockMargin) => {
  return {
    type: actionTypes.FETCH_MARGIN_SUCCESS,
    stockMargin: stockMargin,
  };
};

export const fetchStockMarginFail = (error) => {
  return {
    type: actionTypes.FETCH_MARGIN_FAIL,
    error: error,
  };
};

export const fetchStockMarginStart = () => {
  return {
    type: actionTypes.FETCH_MARGIN_START,
  };
};

export const fetchStockMargin = (id) => {
  return {
    type: actionTypes.FETCH_MARGIN,
    id: id,
  };
};
/// MARGIN

/// UPDATE MARGIN
export const updateStockMargin = (stockMargin) => {
  return {
    type: actionTypes.UPDATE_MARGIN,
    stockMargin: stockMargin,
  };
};

export const resetStockMargin = () => {
  return {
    type: actionTypes.RESET_MARGIN,
  };
};
/// UPDATE MARGIN

/// SAVE MARGIN
export const saveStockMarginSuccess = (stockMargin) => {
  return {
    type: actionTypes.SAVE_MARGIN_SUCCESS,
    stockMargin: stockMargin,
  };
};

export const saveStockMarginFail = (error) => {
  return {
    type: actionTypes.SAVE_MARGIN_FAIL,
    error: error,
  };
};

export const saveStockMarginStart = () => {
  return {
    type: actionTypes.SAVE_MARGIN_START,
  };
};

export const saveStockMargin = (stockMargin) => {
  return {
    type: actionTypes.SAVE_MARGIN,
    stockMargin: stockMargin,
  };
};
/// SAVE MARGIN

/// DELETE MARGIN
export const deleteStockMarginSuccess = (stockMargin) => {
  return {
    type: actionTypes.DELETE_MARGIN_SUCCESS,
  };
};

export const deleteStockMarginFail = (error) => {
  return {
    type: actionTypes.DELETE_MARGIN_FAIL,
    error: error,
  };
};

export const deleteStockMarginStart = () => {
  return {
    type: actionTypes.DELETE_MARGIN_START,
  };
};

export const deleteStockMargin = (stockMargin) => {
  return {
    type: actionTypes.DELETE_MARGIN,
    stockMargin: stockMargin,
  };
};
/// DELETE MARGIN

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_MARGIN_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_MARGIN_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_MARGIN_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stockMargin) => {
  return {
    type: actionTypes.FETCH_MARGIN_AUDIT_LOGS,
    stockMargin: stockMargin,
  };
};
/// VIEW AUDIT LOGS
