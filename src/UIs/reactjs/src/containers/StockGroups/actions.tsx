import * as actionTypes from "./actionTypes";

/// PRODUCTS
export const fetchStockGroupsSuccess = (stockgroups) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    stockgroups: stockgroups,
  };
};

export const fetchStockGroupsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchStockGroupsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchStockGroups = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
  };
};
/// PRODUCTS

/// PRODUCT
export const fetchStockGroupSuccess = (stockgroup) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    stockgroup: stockgroup,
  };
};

export const fetchStockGroupFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error,
  };
};

export const fetchStockGroupStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};

export const fetchStockGroup = (id) => {
  return {
    type: actionTypes.FETCH_PRODUCT,
    id: id,
  };
};
/// PRODUCT

/// UPDATE PRODUCT
export const updateStockGroup = (stockgroup) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    stockgroup: stockgroup,
  };
};

export const resetStockGroup = () => {
  return {
    type: actionTypes.RESET_PRODUCT,
  };
};
/// UPDATE PRODUCT

/// SAVE PRODUCT
export const saveStockGroupSuccess = (stockgroup) => {
  return {
    type: actionTypes.SAVE_PRODUCT_SUCCESS,
    stockgroup: stockgroup,
  };
};

export const saveStockGroupFail = (error) => {
  return {
    type: actionTypes.SAVE_PRODUCT_FAIL,
    error: error,
  };
};

export const saveStockGroupStart = () => {
  return {
    type: actionTypes.SAVE_PRODUCT_START,
  };
};

export const saveStockGroup = (stockgroup) => {
  return {
    type: actionTypes.SAVE_PRODUCT,
    stockgroup: stockgroup,
  };
};
/// SAVE PRODUCT

/// DELETE PRODUCT
export const deleteStockGroupSuccess = (stockgroup) => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
  };
};

export const deleteStockGroupFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAIL,
    error: error,
  };
};

export const deleteStockGroupStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};

export const deleteStockGroup = (stockgroup) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    stockgroup: stockgroup,
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

export const fetchAuditLogs = (stockgroup) => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS,
    stockgroup: stockgroup,
  };
};
/// VIEW AUDIT LOGS
