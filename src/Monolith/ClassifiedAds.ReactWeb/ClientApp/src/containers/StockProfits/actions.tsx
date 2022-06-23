import * as actionTypes from "./actionTypes";

/// PROFITS
export const fetchStockProfitsSuccess = (stockProfits) => {
  return {
    type: actionTypes.FETCH_PROFITS_SUCCESS,
    stockProfits: stockProfits,
  };
};

export const fetchStockProfitsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROFITS_FAIL,
    error: error,
  };
};

export const fetchStockProfitsStart = () => {
  return {
    type: actionTypes.FETCH_PROFITS_START,
  };
};

export const fetchStockProfits = (options) => {
  return {
    options: options,
    type: actionTypes.FETCH_PROFITS,
  };
};
/// PROFITS

/// PROFIT
export const fetchStockProfitSuccess = (stockProfit) => {
  return {
    type: actionTypes.FETCH_PROFIT_SUCCESS,
    stockProfit: stockProfit,
  };
};

export const fetchStockProfitFail = (error) => {
  return {
    type: actionTypes.FETCH_PROFIT_FAIL,
    error: error,
  };
};

export const fetchStockProfitStart = () => {
  return {
    type: actionTypes.FETCH_PROFIT_START,
  };
};

export const fetchStockProfit = (id) => {
  return {
    type: actionTypes.FETCH_PROFIT,
    id: id,
  };
};
/// PROFIT

/// UPDATE PROFIT
export const updateStockProfit = (stockProfit) => {
  return {
    type: actionTypes.UPDATE_PROFIT,
    stockProfit: stockProfit,
  };
};

export const resetStockProfit = () => {
  return {
    type: actionTypes.RESET_PROFIT,
  };
};
/// UPDATE PROFIT

/// SAVE PROFIT
export const saveStockProfitSuccess = (stockProfit) => {
  return {
    type: actionTypes.SAVE_PROFIT_SUCCESS,
    stockProfit: stockProfit,
  };
};

export const saveStockProfitFail = (error) => {
  return {
    type: actionTypes.SAVE_PROFIT_FAIL,
    error: error,
  };
};

export const saveStockProfitStart = () => {
  return {
    type: actionTypes.SAVE_PROFIT_START,
  };
};

export const saveStockProfit = (stockProfit) => {
  return {
    type: actionTypes.SAVE_PROFIT,
    stockProfit: stockProfit,
  };
};
/// SAVE PROFIT

/// DELETE PROFIT
export const deleteStockProfitSuccess = (stockProfit) => {
  return {
    type: actionTypes.DELETE_PROFIT_SUCCESS,
  };
};

export const deleteStockProfitFail = (error) => {
  return {
    type: actionTypes.DELETE_PROFIT_FAIL,
    error: error,
  };
};

export const deleteStockProfitStart = () => {
  return {
    type: actionTypes.DELETE_PROFIT_START,
  };
};

export const deleteStockProfit = (stockProfit) => {
  return {
    type: actionTypes.DELETE_PROFIT,
    stockProfit: stockProfit,
  };
};
/// DELETE PROFIT