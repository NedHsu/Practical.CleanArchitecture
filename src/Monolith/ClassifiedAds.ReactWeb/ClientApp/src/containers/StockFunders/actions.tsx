import * as actionTypes from "./actionTypes";

/// FUNDERS
export const fetchStockFundersSuccess = (stockFunders) => {
  return {
    type: actionTypes.FETCH_FUNDERS_SUCCESS,
    stockFunders: stockFunders,
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
export const fetchStockFunderSuccess = (stockFunder) => {
  return {
    type: actionTypes.FETCH_FUNDER_SUCCESS,
    stockFunder: stockFunder,
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
export const updateStockFunder = (stockFunder) => {
  return {
    type: actionTypes.UPDATE_FUNDER,
    stockFunder: stockFunder,
  };
};

export const resetStockFunder = () => {
  return {
    type: actionTypes.RESET_FUNDER,
  };
};
/// UPDATE FUNDER

/// SAVE FUNDER
export const saveStockFunderSuccess = (stockFunder) => {
  return {
    type: actionTypes.SAVE_FUNDER_SUCCESS,
    stockFunder: stockFunder,
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

export const saveStockFunder = (stockFunder) => {
  return {
    type: actionTypes.SAVE_FUNDER,
    stockFunder: stockFunder,
  };
};
/// SAVE FUNDER

/// DELETE FUNDER
export const deleteStockFunderSuccess = (stockFunder) => {
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

export const deleteStockFunder = (stockFunder) => {
  return {
    type: actionTypes.DELETE_FUNDER,
    stockFunder: stockFunder,
  };
};
/// DELETE FUNDER

//--export
/// FUNDER_SCORES
export const fetchFunderScoresSuccess = (funderScores) => {
  return {
    type: actionTypes.FETCH_FUNDER_SCORES_SUCCESS,
    funderScores: funderScores,
  };
};

export const fetchFunderScoresFail = (error) => {
  return {
    type: actionTypes.FETCH_FUNDER_SCORES_FAIL,
    error: error,
  };
};

export const fetchFunderScoresStart = () => {
  return {
    type: actionTypes.FETCH_FUNDER_SCORES_START,
  };
};

export const fetchFunderScores = (options) => {
  return {
    type: actionTypes.FETCH_FUNDER_SCORES,
    options,
  };
};
/// FUNDER_SCORES