import * as actionTypes from "./actionTypes";

/// D3S
export const fetchD3sSuccess = (d3s) => {
  return {
    type: actionTypes.FETCH_D3S_SUCCESS,
    d3s: d3s,
  };
};

export const fetchD3sFail = (error) => {
  return {
    type: actionTypes.FETCH_D3S_FAIL,
    error: error,
  };
};

export const fetchD3sStart = () => {
  return {
    type: actionTypes.FETCH_D3S_START,
  };
};

export const fetchD3s = () => {
  return {
    type: actionTypes.FETCH_D3S,
  };
};
/// D3S

/// D3
export const fetchD3Success = (d3) => {
  return {
    type: actionTypes.FETCH_D3_SUCCESS,
    d3: d3,
  };
};

export const fetchD3Fail = (error) => {
  return {
    type: actionTypes.FETCH_D3_FAIL,
    error: error,
  };
};

export const fetchD3Start = () => {
  return {
    type: actionTypes.FETCH_D3_START,
  };
};

export const fetchD3 = (id) => {
  return {
    type: actionTypes.FETCH_D3,
    id: id,
  };
};
/// D3

/// UPDATE D3
export const resetD3 = () => {
  return {
    type: actionTypes.RESET_D3,
  };
};
/// UPDATE D3