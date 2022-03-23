import * as actionTypes from "./actionTypes";

/// STOCK_NEWS
export const fetchStockNewsSuccess = (stockNews) => {
  return {
    type: actionTypes.FETCH_STOCK_NEWS_SUCCESS,
    stockNews: stockNews,
  };
};

export const fetchStockNewsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_NEWS_FAIL,
    error: error,
  };
};

export const fetchStockNewsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_NEWS_START,
  };
};

export const fetchStockNews = () => {
  return {
    type: actionTypes.FETCH_STOCK_NEWS,
  };
};
/// STOCK_NEWS

/// STOCK_NEW
export const fetchStockNewSuccess = (stockNew) => {
  return {
    type: actionTypes.FETCH_STOCK_NEW_SUCCESS,
    stockNew: stockNew,
  };
};

export const fetchStockNewFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_NEW_FAIL,
    error: error,
  };
};

export const fetchStockNewStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_NEW_START,
  };
};

export const fetchStockNew = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_NEW,
    id: id,
  };
};
/// STOCK_NEW

/// UPDATE STOCK_NEW
export const updateStockNew = (stockNew) => {
  return {
    type: actionTypes.UPDATE_STOCK_NEW,
    stockNew: stockNew,
  };
};

export const resetStockNew = () => {
  return {
    type: actionTypes.RESET_STOCK_NEW,
  };
};
/// UPDATE STOCK_NEW

/// SAVE STOCK_NEW
export const saveStockNewSuccess = (stockNew) => {
  return {
    type: actionTypes.SAVE_STOCK_NEW_SUCCESS,
    stockNew: stockNew,
  };
};

export const saveStockNewFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_NEW_FAIL,
    error: error,
  };
};

export const saveStockNewStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_NEW_START,
  };
};

export const saveStockNew = (stockNew) => {
  return {
    type: actionTypes.SAVE_STOCK_NEW,
    stockNew: stockNew,
  };
};
/// SAVE STOCK_NEW

/// DELETE STOCK_NEW
export const deleteStockNewSuccess = (stockNew) => {
  return {
    type: actionTypes.DELETE_STOCK_NEW_SUCCESS,
  };
};

export const deleteStockNewFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_NEW_FAIL,
    error: error,
  };
};

export const deleteStockNewStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_NEW_START,
  };
};

export const deleteStockNew = (stockNew) => {
  return {
    type: actionTypes.DELETE_STOCK_NEW,
    stockNew: stockNew,
  };
};
/// DELETE STOCK_NEW

//--export
