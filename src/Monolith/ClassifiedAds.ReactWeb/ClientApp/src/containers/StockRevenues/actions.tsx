import * as actionTypes from "./actionTypes";

/// REVENUES
export const fetchStockRevenuesSuccess = (stockRevenues) => {
  return {
    type: actionTypes.FETCH_REVENUES_SUCCESS,
    stockRevenues: stockRevenues,
  };
};

export const fetchStockRevenuesFail = (error) => {
  return {
    type: actionTypes.FETCH_REVENUES_FAIL,
    error: error,
  };
};

export const fetchStockRevenuesStart = () => {
  return {
    type: actionTypes.FETCH_REVENUES_START,
  };
};

export const fetchStockRevenues = (options) => {
  return {
    options: options,
    type: actionTypes.FETCH_REVENUES,
  };
};
/// REVENUES

/// REVENUE
export const fetchStockRevenueSuccess = (stockRevenue) => {
  return {
    type: actionTypes.FETCH_REVENUE_SUCCESS,
    stockRevenue: stockRevenue,
  };
};

export const fetchStockRevenueFail = (error) => {
  return {
    type: actionTypes.FETCH_REVENUE_FAIL,
    error: error,
  };
};

export const fetchStockRevenueStart = () => {
  return {
    type: actionTypes.FETCH_REVENUE_START,
  };
};

export const fetchStockRevenue = (id) => {
  return {
    type: actionTypes.FETCH_REVENUE,
    id: id,
  };
};
/// REVENUE

/// UPDATE REVENUE
export const updateStockRevenue = (stockRevenue) => {
  return {
    type: actionTypes.UPDATE_REVENUE,
    stockRevenue: stockRevenue,
  };
};

export const resetStockRevenue = () => {
  return {
    type: actionTypes.RESET_REVENUE,
  };
};
/// UPDATE REVENUE

/// SAVE REVENUE
export const saveStockRevenueSuccess = (stockRevenue) => {
  return {
    type: actionTypes.SAVE_REVENUE_SUCCESS,
    stockRevenue: stockRevenue,
  };
};

export const saveStockRevenueFail = (error) => {
  return {
    type: actionTypes.SAVE_REVENUE_FAIL,
    error: error,
  };
};

export const saveStockRevenueStart = () => {
  return {
    type: actionTypes.SAVE_REVENUE_START,
  };
};

export const saveStockRevenue = (stockRevenue) => {
  return {
    type: actionTypes.SAVE_REVENUE,
    stockRevenue: stockRevenue,
  };
};
/// SAVE REVENUE

/// DELETE REVENUE
export const deleteStockRevenueSuccess = (stockRevenue) => {
  return {
    type: actionTypes.DELETE_REVENUE_SUCCESS,
  };
};

export const deleteStockRevenueFail = (error) => {
  return {
    type: actionTypes.DELETE_REVENUE_FAIL,
    error: error,
  };
};

export const deleteStockRevenueStart = () => {
  return {
    type: actionTypes.DELETE_REVENUE_START,
  };
};

export const deleteStockRevenue = (stockRevenue) => {
  return {
    type: actionTypes.DELETE_REVENUE,
    stockRevenue: stockRevenue,
  };
};
/// DELETE REVENUE