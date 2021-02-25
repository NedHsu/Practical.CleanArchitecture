import * as actionTypes from "./actionTypes";

/// MATCHS
export const fetchMatchesSuccess = (matches) => {
  return {
    type: actionTypes.FETCH_MATCHS_SUCCESS,
    matches: matches,
  };
};

export const fetchMatchesFail = (error) => {
  return {
    type: actionTypes.FETCH_MATCHS_FAIL,
    error: error,
  };
};

export const fetchMatchesStart = () => {
  return {
    type: actionTypes.FETCH_MATCHS_START,
  };
};

export const fetchMatches = () => {
  return {
    type: actionTypes.FETCH_MATCHS,
  };
};
/// MATCHS

/// MATCH
export const fetchMatchSuccess = (match) => {
  return {
    type: actionTypes.FETCH_MATCH_SUCCESS,
    match: match,
  };
};

export const fetchMatchFail = (error) => {
  return {
    type: actionTypes.FETCH_MATCH_FAIL,
    error: error,
  };
};

export const fetchMatchStart = () => {
  return {
    type: actionTypes.FETCH_MATCH_START,
  };
};

export const fetchMatch = (id) => {
  return {
    type: actionTypes.FETCH_MATCH,
    id: id,
  };
};
/// MATCH

/// UPDATE MATCH
export const updateMatch = (match) => {
  return {
    type: actionTypes.UPDATE_MATCH,
    match: match,
  };
};

export const resetMatch = () => {
  return {
    type: actionTypes.RESET_MATCH,
  };
};
/// UPDATE MATCH

/// SAVE MATCH
export const saveMatchSuccess = (match) => {
  return {
    type: actionTypes.SAVE_MATCH_SUCCESS,
    match: match,
  };
};

export const saveMatchFail = (error) => {
  return {
    type: actionTypes.SAVE_MATCH_FAIL,
    error: error,
  };
};

export const saveMatchStart = () => {
  return {
    type: actionTypes.SAVE_MATCH_START,
  };
};

export const saveMatch = (match) => {
  return {
    type: actionTypes.SAVE_MATCH,
    match: match,
  };
};
/// SAVE MATCH

/// DELETE MATCH
export const deleteMatchSuccess = (match) => {
  return {
    type: actionTypes.DELETE_MATCH_SUCCESS,
  };
};

export const deleteMatchFail = (error) => {
  return {
    type: actionTypes.DELETE_MATCH_FAIL,
    error: error,
  };
};

export const deleteMatchStart = () => {
  return {
    type: actionTypes.DELETE_MATCH_START,
  };
};

export const deleteMatch = (match) => {
  return {
    type: actionTypes.DELETE_MATCH,
    match: match,
  };
};
/// DELETE MATCH

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_MATCH_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_MATCH_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_MATCH_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (match) => {
  return {
    type: actionTypes.FETCH_MATCH_AUDIT_LOGS,
    match: match,
  };
};
/// VIEW AUDIT LOGS
