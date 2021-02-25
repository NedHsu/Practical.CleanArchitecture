import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  matches: [],
  match: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// Matches
const fetchMatchesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMatchesSuccess = (state, action) => {
  console.log("fetchMatchesSuccess");
  return updateObject(state, {
    matches: action.matches,
    loading: false,
  });
};

const fetchMatchesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Matches

/// Match
const fetchMatchStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMatchSuccess = (state, action) => {
  return updateObject(state, {
    match: action.match,
    loading: false,
  });
};

const fetchMatchFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Match

const saveMatchStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveMatchSuccess = (state, action) => {
  return updateObject(state, {
    match: action.match,
    loading: false,
    saved: true,
  });
};

const saveMatchFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHS_START:
      return fetchMatchesStart(state, action);
    case actionTypes.FETCH_MATCHS_SUCCESS:
      return fetchMatchesSuccess(state, action);
    case actionTypes.FETCH_MATCHS_FAIL:
    case actionTypes.FETCH_MATCH_START:
      return fetchMatchStart(state, action);
    case actionTypes.FETCH_MATCH_SUCCESS:
      return fetchMatchSuccess(state, action);
    case actionTypes.FETCH_MATCH_FAIL:
      return fetchMatchFail(state, action);
    case actionTypes.UPDATE_MATCH:
      return updateObject(state, { match: action.match });
    case actionTypes.RESET_MATCH:
      return updateObject(state, initialState);
    case actionTypes.SAVE_MATCH_START:
      return saveMatchStart(state, action);
    case actionTypes.SAVE_MATCH_SUCCESS:
      return saveMatchSuccess(state, action);
    case actionTypes.SAVE_MATCH_FAIL:
      return saveMatchFail(state, action);
    case actionTypes.DELETE_MATCH_START:
      return updateObject(state, {
        match: action.match,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_MATCH_SUCCESS:
      return updateObject(state, {
        match: initialState.match,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_MATCH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_MATCH_AUDIT_LOGS_START:
      return updateObject(state, {
        match: action.match,
        loading: true,
      });
    case actionTypes.FETCH_MATCH_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_MATCH_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
