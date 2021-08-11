import * as actionTypes from "./actionTypes";

/// STOCK_DAYS
export const fetchStockDaysSuccess = (stockdays) => {
  return {
    type: actionTypes.FETCH_STOCK_DAYS_SUCCESS,
    stockdays: stockdays,
  };
};

export const fetchStocksDaysSuccess = (stockDayMaps) => {
  return {
    type: actionTypes.FETCH_STOCKS_DAYS_SUCCESS,
    stockDayMaps: stockDayMaps,
  };
};

export const fetchStockDaysFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_DAYS_FAIL,
    error: error,
  };
};

export const fetchStockDaysStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_DAYS_START,
  };
};

export const fetchStockDays = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_DAYS,
    options: options,
  };
};

export const fetchStocksDays = (options) => {
  return {
    type: actionTypes.FETCH_STOCKS_DAYS,
    options: options,
  };
};
/// STOCK_DAYS

/// STOCK_DAY
export const fetchStockDaySuccess = (stockday) => {
  return {
    type: actionTypes.FETCH_STOCK_DAY_SUCCESS,
    stockday: stockday,
  };
};

export const fetchStockDayFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_DAY_FAIL,
    error: error,
  };
};

export const fetchStockDayStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_DAY_START,
  };
};

export const fetchStockDay = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_DAY,
    id: id,
  };
};
/// STOCK_DAY

/// UPDATE STOCK_DAY
export const resetStockDay = () => {
  return {
    type: actionTypes.RESET_STOCK_DAY,
  };
};
/// UPDATE STOCK_DAY