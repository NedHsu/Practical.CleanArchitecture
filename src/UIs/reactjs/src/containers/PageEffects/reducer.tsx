import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  pageeffects: [],
  pageeffect: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// PageEffects
const fetchPageEffectsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPageEffectsSuccess = (state, action) => {
  return updateObject(state, {
    pageeffects: action.pageeffects,
    loading: false,
  });
};

const fetchPageEffectsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// PageEffects

/// PageEffect
const fetchPageEffectStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPageEffectSuccess = (state, action) => {
  return updateObject(state, {
    pageeffect: action.pageeffect,
    loading: false,
  });
};

const fetchPageEffectFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// PageEffect

const savePageEffectStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const savePageEffectSuccess = (state, action) => {
  return updateObject(state, {
    pageeffect: action.pageeffect,
    loading: false,
    saved: true,
  });
};

const savePageEffectFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchPageEffectsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchPageEffectsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchPageEffectsFail(state, action);
    case actionTypes.FETCH_PRODUCT_START:
      return fetchPageEffectStart(state, action);
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return fetchPageEffectSuccess(state, action);
    case actionTypes.FETCH_PRODUCT_FAIL:
      return fetchPageEffectFail(state, action);
    case actionTypes.UPDATE_PRODUCT:
      return updateObject(state, { pageeffect: action.pageeffect });
    case actionTypes.RESET_PRODUCT:
      return updateObject(state, initialState);
    case actionTypes.SAVE_PRODUCT_START:
      return savePageEffectStart(state, action);
    case actionTypes.SAVE_PRODUCT_SUCCESS:
      return savePageEffectSuccess(state, action);
    case actionTypes.SAVE_PRODUCT_FAIL:
      return savePageEffectFail(state, action);
    case actionTypes.DELETE_PRODUCT_START:
      return updateObject(state, {
        pageeffect: action.pageeffect,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return updateObject(state, {
        pageeffect: initialState.pageeffect,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_PRODUCT_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_PRODUCT_AUDIT_LOGS_START:
      return updateObject(state, {
        pageeffect: action.pageeffect,
        loading: true,
      });
    case actionTypes.FETCH_PRODUCT_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_PRODUCT_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
