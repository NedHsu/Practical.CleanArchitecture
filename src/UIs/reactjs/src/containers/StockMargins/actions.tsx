import * as actionTypes from "./actionTypes";

/// MARGINS
export const fetchStockMarginsSuccess = (stockmargins) => {
  return {
    type: actionTypes.FETCH_MARGINS_SUCCESS,
    stockmargins: stockmargins,
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

/// MARGIN
export const fetchStockMarginSuccess = (stockmargin) => {
  return {
    type: actionTypes.FETCH_MARGIN_SUCCESS,
    stockmargin: stockmargin,
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
export const updateStockMargin = (stockmargin) => {
  return {
    type: actionTypes.UPDATE_MARGIN,
    stockmargin: stockmargin,
  };
};

export const resetStockMargin = () => {
  return {
    type: actionTypes.RESET_MARGIN,
  };
};
/// UPDATE MARGIN

/// SAVE MARGIN
export const saveStockMarginSuccess = (stockmargin) => {
  return {
    type: actionTypes.SAVE_MARGIN_SUCCESS,
    stockmargin: stockmargin,
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

export const saveStockMargin = (stockmargin) => {
  return {
    type: actionTypes.SAVE_MARGIN,
    stockmargin: stockmargin,
  };
};
/// SAVE MARGIN

/// DELETE MARGIN
export const deleteStockMarginSuccess = (stockmargin) => {
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

export const deleteStockMargin = (stockmargin) => {
  return {
    type: actionTypes.DELETE_MARGIN,
    stockmargin: stockmargin,
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

export const fetchAuditLogs = (stockmargin) => {
  return {
    type: actionTypes.FETCH_MARGIN_AUDIT_LOGS,
    stockmargin: stockmargin,
  };
};
/// VIEW AUDIT LOGS
