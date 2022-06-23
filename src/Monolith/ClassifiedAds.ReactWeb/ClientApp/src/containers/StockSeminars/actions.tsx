import * as actionTypes from "./actionTypes";

/// SEMINARS
export const fetchStockSeminarsSuccess = (pagedStockSeminar) => {
  return {
    type: actionTypes.FETCH_SEMINARS_SUCCESS,
    pagedStockSeminar: pagedStockSeminar,
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

export const fetchStockSeminars = (options) => {
  return {
    type: actionTypes.FETCH_SEMINARS,
    options: options
  };
};
/// SEMINARS

/// SEMINAR
export const fetchStockSeminarSuccess = (stockSeminar) => {
  return {
    type: actionTypes.FETCH_SEMINAR_SUCCESS,
    stockSeminar: stockSeminar,
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
export const updateStockSeminar = (stockSeminar) => {
  return {
    type: actionTypes.UPDATE_SEMINAR,
    stockSeminar: stockSeminar,
  };
};

export const resetStockSeminar = () => {
  return {
    type: actionTypes.RESET_SEMINAR,
  };
};
/// UPDATE SEMINAR

/// SAVE SEMINAR
export const saveStockSeminarSuccess = (stockSeminar) => {
  return {
    type: actionTypes.SAVE_SEMINAR_SUCCESS,
    stockSeminar: stockSeminar,
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

export const saveStockSeminar = (stockSeminar) => {
  return {
    type: actionTypes.SAVE_SEMINAR,
    stockSeminar: stockSeminar,
  };
};
/// SAVE SEMINAR

/// DELETE SEMINAR
export const deleteStockSeminarSuccess = (stockSeminar) => {
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

export const deleteStockSeminar = (stockSeminar) => {
  return {
    type: actionTypes.DELETE_SEMINAR,
    stockSeminar: stockSeminar,
  };
};
/// DELETE SEMINAR
