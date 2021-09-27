import * as actionTypes from "./actionTypes";

/// FUNDERS
export const fetchStockFundersSuccess = (stockfunders) => {
  return {
    type: actionTypes.FETCH_FUNDERS_SUCCESS,
    stockfunders: stockfunders,
  };
};

export const fetchStockFundersFail = (error) => {
  return {
    type: actionTypes.FETCH_FUNDERS_FAIL,
    error: error,
  };
};

export const fetchStockFundersStart = () => {
  return {
    type: actionTypes.FETCH_FUNDERS_START,
  };
};

export const fetchStockFunders = (code: string, startDate, endDate) => {
  return {
    type: actionTypes.FETCH_FUNDERS,
    code: code,
    options: {
      startDate,
      endDate
    }
  };
};

export const fetchAllStockFunders = () => {
  return {
    type: actionTypes.FETCH_FUNDERS,
  };
};
/// FUNDERS

/// FUNDER
export const fetchStockFunderSuccess = (stockfunder) => {
  return {
    type: actionTypes.FETCH_FUNDER_SUCCESS,
    stockfunder: stockfunder,
  };
};

export const fetchStockFunderFail = (error) => {
  return {
    type: actionTypes.FETCH_FUNDER_FAIL,
    error: error,
  };
};

export const fetchStockFunderStart = () => {
  return {
    type: actionTypes.FETCH_FUNDER_START,
  };
};

export const fetchStockFunder = (id) => {
  return {
    type: actionTypes.FETCH_FUNDER,
    id: id,
  };
};
/// FUNDER

/// UPDATE FUNDER
export const updateStockFunder = (stockfunder) => {
  return {
    type: actionTypes.UPDATE_FUNDER,
    stockfunder: stockfunder,
  };
};

export const resetStockFunder = () => {
  return {
    type: actionTypes.RESET_FUNDER,
  };
};
/// UPDATE FUNDER

/// SAVE FUNDER
export const saveStockFunderSuccess = (stockfunder) => {
  return {
    type: actionTypes.SAVE_FUNDER_SUCCESS,
    stockfunder: stockfunder,
  };
};

export const saveStockFunderFail = (error) => {
  return {
    type: actionTypes.SAVE_FUNDER_FAIL,
    error: error,
  };
};

export const saveStockFunderStart = () => {
  return {
    type: actionTypes.SAVE_FUNDER_START,
  };
};

export const saveStockFunder = (stockfunder) => {
  return {
    type: actionTypes.SAVE_FUNDER,
    stockfunder: stockfunder,
  };
};
/// SAVE FUNDER

/// DELETE FUNDER
export const deleteStockFunderSuccess = (stockfunder) => {
  return {
    type: actionTypes.DELETE_FUNDER_SUCCESS,
  };
};

export const deleteStockFunderFail = (error) => {
  return {
    type: actionTypes.DELETE_FUNDER_FAIL,
    error: error,
  };
};

export const deleteStockFunderStart = () => {
  return {
    type: actionTypes.DELETE_FUNDER_START,
  };
};

export const deleteStockFunder = (stockfunder) => {
  return {
    type: actionTypes.DELETE_FUNDER,
    stockfunder: stockfunder,
  };
};
/// DELETE FUNDER
