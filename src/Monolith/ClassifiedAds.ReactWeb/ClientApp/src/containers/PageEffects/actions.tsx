import * as actionTypes from "./actionTypes";

/// PRODUCTS
export const fetchPageEffectsSuccess = (pageeffects) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    pageeffects: pageeffects,
  };
};

export const fetchPageEffectsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchPageEffectsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchPageEffects = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
  };
};
/// PRODUCTS

/// PRODUCT
export const fetchPageEffectSuccess = (pageeffect) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    pageeffect: pageeffect,
  };
};

export const fetchPageEffectFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error,
  };
};

export const fetchPageEffectStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};

export const fetchPageEffect = (id) => {
  return {
    type: actionTypes.FETCH_PRODUCT,
    id: id,
  };
};
/// PRODUCT

/// UPDATE PRODUCT
export const updatePageEffect = (pageeffect) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    pageeffect: pageeffect,
  };
};

export const resetPageEffect = () => {
  return {
    type: actionTypes.RESET_PRODUCT,
  };
};
/// UPDATE PRODUCT

/// SAVE PRODUCT
export const savePageEffectSuccess = (pageeffect) => {
  return {
    type: actionTypes.SAVE_PRODUCT_SUCCESS,
    pageeffect: pageeffect,
  };
};

export const savePageEffectFail = (error) => {
  return {
    type: actionTypes.SAVE_PRODUCT_FAIL,
    error: error,
  };
};

export const savePageEffectStart = () => {
  return {
    type: actionTypes.SAVE_PRODUCT_START,
  };
};

export const savePageEffect = (pageeffect) => {
  return {
    type: actionTypes.SAVE_PRODUCT,
    pageeffect: pageeffect,
  };
};
/// SAVE PRODUCT

/// DELETE PRODUCT
export const deletePageEffectSuccess = (pageeffect) => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
  };
};

export const deletePageEffectFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAIL,
    error: error,
  };
};

export const deletePageEffectStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};

export const deletePageEffect = (pageeffect) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    pageeffect: pageeffect,
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

export const fetchAuditLogs = (pageeffect) => {
  return {
    type: actionTypes.FETCH_PRODUCT_AUDIT_LOGS,
    pageeffect: pageeffect,
  };
};
/// VIEW AUDIT LOGS
