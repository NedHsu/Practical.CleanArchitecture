import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  stockEPSList: [],
  stockEPS: {
    name: "",
    code: "",
    description: "",
  },
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// StockEPSes
const fetchStockEPSesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockEPSesSuccess = (state, action) => {
  return updateObject(state, {
    stockEPSList: action.stockEPSList?.map(x => {
      return {
        ...x,
        pe: x.pe.toFixed(2),
        p_PE: x.p_PE.toFixed(2),
        dif_PE: (x.pe - x.p_PE).toFixed(2),
        growthRatio: x.growthRatio.toFixed(2),
      }
    }),
    loading: false,
  });
};

const fetchStockEPSesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockEPSes

/// StockEPS
const fetchStockEPSStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchStockEPSSuccess = (state, action) => {
  return updateObject(state, {
    stockEPS: action.stockEPS,
    loading: false,
  });
};

const fetchStockEPSFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// StockEPS

const saveStockEPSStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveStockEPSSuccess = (state, action) => {
  return updateObject(state, {
    stockEPS: action.stockEPS,
    loading: false,
    saved: true,
  });
};

const saveStockEPSFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};
//--functions

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_EPSSES_START:
      return fetchStockEPSesStart(state, action);
    case actionTypes.FETCH_STOCK_EPSSES_SUCCESS:
      return fetchStockEPSesSuccess(state, action);
    case actionTypes.FETCH_STOCK_EPSSES_FAIL:
      return fetchStockEPSesFail(state, action);
    case actionTypes.FETCH_STOCK_EPSS_START:
      return fetchStockEPSStart(state, action);
    case actionTypes.FETCH_STOCK_EPSS_SUCCESS:
      return fetchStockEPSSuccess(state, action);
    case actionTypes.FETCH_STOCK_EPSS_FAIL:
      return fetchStockEPSFail(state, action);
    case actionTypes.UPDATE_STOCK_EPSS:
      return updateObject(state, { stockEPS: action.stockEPS });
    case actionTypes.RESET_STOCK_EPSS:
      return updateObject(state, initialState);
    case actionTypes.SAVE_STOCK_EPSS_START:
      return saveStockEPSStart(state, action);
    case actionTypes.SAVE_STOCK_EPSS_SUCCESS:
      return saveStockEPSSuccess(state, action);
    case actionTypes.SAVE_STOCK_EPSS_FAIL:
      return saveStockEPSFail(state, action);
    case actionTypes.DELETE_STOCK_EPSS_START:
      return updateObject(state, {
        stockEPS: action.stockEPS,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_STOCK_EPSS_SUCCESS:
      return updateObject(state, {
        stockEPS: initialState.stockEPS,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_STOCK_EPSS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    //--case
    default:
      return state;
  }
};

export default reducer;
