import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  d3s: [],
  d3: {
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

/// D3s
const fetchD3sStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchD3sSuccess = (state, action) => {
  return updateObject(state, {
    d3s: action.d3s,
    loading: false,
  });
};

const fetchD3sFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// D3s

/// D3
const fetchD3Start = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchD3Success = (state, action) => {
  return updateObject(state, {
    d3: action.d3,
    loading: false,
  });
};

const fetchD3Fail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// D3

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_D3S_START:
      return fetchD3sStart(state, action);
    case actionTypes.FETCH_D3S_SUCCESS:
      return fetchD3sSuccess(state, action);
    case actionTypes.FETCH_D3S_FAIL:
      return fetchD3sFail(state, action);
    case actionTypes.FETCH_D3_START:
      return fetchD3Start(state, action);
    case actionTypes.FETCH_D3_SUCCESS:
      return fetchD3Success(state, action);
    case actionTypes.FETCH_D3_FAIL:
      return fetchD3Fail(state, action);
    case actionTypes.RESET_D3:
      return updateObject(state, initialState);
    default:
      return state;
  }
};

export default reducer;
