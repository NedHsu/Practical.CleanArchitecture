import * as actionTypes from "./actionTypes";

/// STOCK_GROUPS
export const fetchStockGroupsSuccess = (stockGroups) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUPS_SUCCESS,
    stockGroups: stockGroups,
  };
};

export const fetchStockGroupsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUPS_FAIL,
    error: error,
  };
};

export const fetchStockGroupsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUPS_START,
  };
};

export const fetchStockGroups = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUPS,
  };
};
/// STOCK_GROUPS

/// STOCK_GROUP
export const fetchStockGroupSuccess = (stockGroup) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_SUCCESS,
    stockGroup: stockGroup,
  };
};

export const fetchStockGroupFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_FAIL,
    error: error,
  };
};

export const fetchStockGroupStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_START,
  };
};

export const fetchStockGroup = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP,
    id: id,
  };
};
/// STOCK_GROUP

/// UPDATE STOCK_GROUP
export const updateStockGroup = (stockGroup) => {
  return {
    type: actionTypes.UPDATE_STOCK_GROUP,
    stockGroup: stockGroup,
  };
};

export const resetStockGroup = () => {
  return {
    type: actionTypes.RESET_STOCK_GROUP,
  };
};
/// UPDATE STOCK_GROUP

/// SAVE STOCK_GROUP
export const saveStockGroupSuccess = (stockGroup) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_SUCCESS,
    stockGroup: stockGroup,
  };
};

export const saveStockGroupFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_FAIL,
    error: error,
  };
};

export const saveStockGroupStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP_START,
  };
};

export const saveStockGroup = (stockGroup) => {
  return {
    type: actionTypes.SAVE_STOCK_GROUP,
    stockGroup: stockGroup,
  };
};
/// SAVE STOCK_GROUP

/// DELETE STOCK_GROUP
export const deleteStockGroupSuccess = (stockGroup) => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_SUCCESS,
  };
};

export const deleteStockGroupFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_FAIL,
    error: error,
  };
};

export const deleteStockGroupStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP_START,
  };
};

export const deleteStockGroup = (stockGroup) => {
  return {
    type: actionTypes.DELETE_STOCK_GROUP,
    stockGroup: stockGroup,
  };
};
/// DELETE STOCK_GROUP

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stockGroup) => {
  return {
    type: actionTypes.FETCH_STOCK_GROUP_AUDIT_LOGS,
    stockGroup: stockGroup,
  };
};
/// VIEW AUDIT LOGS
