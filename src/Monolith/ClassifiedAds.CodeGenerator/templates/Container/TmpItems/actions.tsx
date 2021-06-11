import * as actionTypes from "./actionTypes";

/// TMPITEMS
export const fetchTmpItemsSuccess = (tmpItems) => {
  return {
    type: actionTypes.FETCH_TMPITEMS_SUCCESS,
    tmpItems: tmpItems,
  };
};

export const fetchTmpItemsFail = (error) => {
  return {
    type: actionTypes.FETCH_TMPITEMS_FAIL,
    error: error,
  };
};

export const fetchTmpItemsStart = () => {
  return {
    type: actionTypes.FETCH_TMPITEMS_START,
  };
};

export const fetchTmpItems = () => {
  return {
    type: actionTypes.FETCH_TMPITEMS,
  };
};
/// TMPITEMS

/// TMPITEM
export const fetchTmpItemSuccess = (tmpItem) => {
  return {
    type: actionTypes.FETCH_TMPITEM_SUCCESS,
    tmpItem: tmpItem,
  };
};

export const fetchTmpItemFail = (error) => {
  return {
    type: actionTypes.FETCH_TMPITEM_FAIL,
    error: error,
  };
};

export const fetchTmpItemStart = () => {
  return {
    type: actionTypes.FETCH_TMPITEM_START,
  };
};

export const fetchTmpItem = (id) => {
  return {
    type: actionTypes.FETCH_TMPITEM,
    id: id,
  };
};
/// TMPITEM

/// UPDATE TMPITEM
export const updateTmpItem = (tmpItem) => {
  return {
    type: actionTypes.UPDATE_TMPITEM,
    tmpItem: tmpItem,
  };
};

export const resetTmpItem = () => {
  return {
    type: actionTypes.RESET_TMPITEM,
  };
};
/// UPDATE TMPITEM

/// SAVE TMPITEM
export const saveTmpItemSuccess = (tmpItem) => {
  return {
    type: actionTypes.SAVE_TMPITEM_SUCCESS,
    tmpItem: tmpItem,
  };
};

export const saveTmpItemFail = (error) => {
  return {
    type: actionTypes.SAVE_TMPITEM_FAIL,
    error: error,
  };
};

export const saveTmpItemStart = () => {
  return {
    type: actionTypes.SAVE_TMPITEM_START,
  };
};

export const saveTmpItem = (tmpItem) => {
  return {
    type: actionTypes.SAVE_TMPITEM,
    tmpItem: tmpItem,
  };
};
/// SAVE TMPITEM

/// DELETE TMPITEM
export const deleteTmpItemSuccess = (tmpItem) => {
  return {
    type: actionTypes.DELETE_TMPITEM_SUCCESS,
  };
};

export const deleteTmpItemFail = (error) => {
  return {
    type: actionTypes.DELETE_TMPITEM_FAIL,
    error: error,
  };
};

export const deleteTmpItemStart = () => {
  return {
    type: actionTypes.DELETE_TMPITEM_START,
  };
};

export const deleteTmpItem = (tmpItem) => {
  return {
    type: actionTypes.DELETE_TMPITEM,
    tmpItem: tmpItem,
  };
};
/// DELETE TMPITEM

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_TMPITEM_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_TMPITEM_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_TMPITEM_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (tmpItem) => {
  return {
    type: actionTypes.FETCH_TMPITEM_AUDIT_LOGS,
    tmpItem: tmpItem,
  };
};
/// VIEW AUDIT LOGS
