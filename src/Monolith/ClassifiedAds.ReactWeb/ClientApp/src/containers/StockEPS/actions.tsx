import * as actionTypes from "./actionTypes";

/// STOCK_EPSSES
export const fetchStockEPSesSuccess = (stockEPSList) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSSES_SUCCESS,
    stockEPSList: stockEPSList,
  };
};

export const fetchStockEPSesFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSSES_FAIL,
    error: error,
  };
};

export const fetchStockEPSesStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_EPSSES_START,
  };
};

export const fetchStockEPSes = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSSES,
    options: options
  };
};
/// STOCK_EPSSES

/// STOCK_EPSS
export const fetchStockEPSSuccess = (stockEPS) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSS_SUCCESS,
    stockEPS: stockEPS,
  };
};

export const fetchStockEPSFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSS_FAIL,
    error: error,
  };
};

export const fetchStockEPSStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_EPSS_START,
  };
};

export const fetchStockEPS = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_EPSS,
    id: id,
  };
};
/// STOCK_EPSS

/// UPDATE STOCK_EPSS
export const updateStockEPS = (stockEPS) => {
  return {
    type: actionTypes.UPDATE_STOCK_EPSS,
    stockEPS: stockEPS,
  };
};

export const resetStockEPS = () => {
  return {
    type: actionTypes.RESET_STOCK_EPSS,
  };
};
/// UPDATE STOCK_EPSS

/// SAVE STOCK_EPSS
export const saveStockEPSSuccess = (stockEPS) => {
  return {
    type: actionTypes.SAVE_STOCK_EPSS_SUCCESS,
    stockEPS: stockEPS,
  };
};

export const saveStockEPSFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_EPSS_FAIL,
    error: error,
  };
};

export const saveStockEPSStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_EPSS_START,
  };
};

export const saveStockEPS = (stockEPS) => {
  return {
    type: actionTypes.SAVE_STOCK_EPSS,
    stockEPS: stockEPS,
  };
};
/// SAVE STOCK_EPSS

/// DELETE STOCK_EPSS
export const deleteStockEPSSuccess = (stockEPS) => {
  return {
    type: actionTypes.DELETE_STOCK_EPSS_SUCCESS,
  };
};

export const deleteStockEPSFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_EPSS_FAIL,
    error: error,
  };
};

export const deleteStockEPSStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_EPSS_START,
  };
};

export const deleteStockEPS = (stockEPS) => {
  return {
    type: actionTypes.DELETE_STOCK_EPSS,
    stockEPS: stockEPS,
  };
};
/// DELETE STOCK_EPSS

//--export
