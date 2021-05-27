import * as actionTypes from "./actionTypes";

/// SEMINARS
export const fetchStockSeminarsSuccess = (stockseminars) => {
  return {
    type: actionTypes.FETCH_SEMINARS_SUCCESS,
    stockseminars: stockseminars,
  };
};

export const fetchStockSeminarsFail = (error) => {
  return {
    type: actionTypes.FETCH_SEMINARS_FAIL,
    error: error,
  };
};

export const fetchStockSeminarsStart = () => {
  return {
    type: actionTypes.FETCH_SEMINARS_START,
  };
};

export const fetchStockSeminars = () => {
  return {
    type: actionTypes.FETCH_SEMINARS,
  };
};
/// SEMINARS

/// SEMINAR
export const fetchStockSeminarSuccess = (stockseminar) => {
  return {
    type: actionTypes.FETCH_SEMINAR_SUCCESS,
    stockseminar: stockseminar,
  };
};

export const fetchStockSeminarFail = (error) => {
  return {
    type: actionTypes.FETCH_SEMINAR_FAIL,
    error: error,
  };
};

export const fetchStockSeminarStart = () => {
  return {
    type: actionTypes.FETCH_SEMINAR_START,
  };
};

export const fetchStockSeminar = (id) => {
  return {
    type: actionTypes.FETCH_SEMINAR,
    id: id,
  };
};
/// SEMINAR

/// UPDATE SEMINAR
export const updateStockSeminar = (stockseminar) => {
  return {
    type: actionTypes.UPDATE_SEMINAR,
    stockseminar: stockseminar,
  };
};

export const resetStockSeminar = () => {
  return {
    type: actionTypes.RESET_SEMINAR,
  };
};
/// UPDATE SEMINAR

/// SAVE SEMINAR
export const saveStockSeminarSuccess = (stockseminar) => {
  return {
    type: actionTypes.SAVE_SEMINAR_SUCCESS,
    stockseminar: stockseminar,
  };
};

export const saveStockSeminarFail = (error) => {
  return {
    type: actionTypes.SAVE_SEMINAR_FAIL,
    error: error,
  };
};

export const saveStockSeminarStart = () => {
  return {
    type: actionTypes.SAVE_SEMINAR_START,
  };
};

export const saveStockSeminar = (stockseminar) => {
  return {
    type: actionTypes.SAVE_SEMINAR,
    stockseminar: stockseminar,
  };
};
/// SAVE SEMINAR

/// DELETE SEMINAR
export const deleteStockSeminarSuccess = (stockseminar) => {
  return {
    type: actionTypes.DELETE_SEMINAR_SUCCESS,
  };
};

export const deleteStockSeminarFail = (error) => {
  return {
    type: actionTypes.DELETE_SEMINAR_FAIL,
    error: error,
  };
};

export const deleteStockSeminarStart = () => {
  return {
    type: actionTypes.DELETE_SEMINAR_START,
  };
};

export const deleteStockSeminar = (stockseminar) => {
  return {
    type: actionTypes.DELETE_SEMINAR,
    stockseminar: stockseminar,
  };
};
/// DELETE SEMINAR
