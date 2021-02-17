import * as actionTypes from "./actionTypes";

/// PRODUCTS
export const fetchMatchesSuccess = (matches) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    matches: matches,
  };
};

export const fetchMatchesFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchMatchesStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchMatches = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
  };
};
/// PRODUCTS

/// PRODUCT
export const fetchMatchSuccess = (match) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    match: match,
  };
};

export const fetchMatchFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error,
  };
};

export const fetchMatchStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};

export const fetchMatch = (id) => {
  return {
    type: actionTypes.FETCH_PRODUCT,
    id: id,
  };
};
/// PRODUCT

/// UPDATE PRODUCT
export const updateMatch = (match) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    match: match,
  };
};

export const resetMatch = () => {
  return {
    type: actionTypes.RESET_PRODUCT,
  };
};
/// UPDATE PRODUCT

/// SAVE PRODUCT
export const saveMatchSuccess = (match) => {
  return {
    type: actionTypes.SAVE_PRODUCT_SUCCESS,
    match: match,
  };
};

export const saveMatchFail = (error) => {
  return {
    type: actionTypes.SAVE_PRODUCT_FAIL,
    error: error,
  };
};

export const saveMatchStart = () => {
  return {
    type: actionTypes.SAVE_PRODUCT_START,
  };
};

export const saveMatch = (match) => {
  return {
    type: actionTypes.SAVE_PRODUCT,
    match: match,
  };
};
/// SAVE PRODUCT

/// DELETE PRODUCT
export const deleteMatchSuccess = (match) => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
  };
};

export const deleteMatchFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAIL,
    error: error,
  };
};

export const deleteMatchStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};

export const deleteMatch = (match) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    match: match,
  };
};
/// DELETE PRODUCT

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (match) => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS,
    match: match,
  };
};
/// VIEW AUDIT LOGS
