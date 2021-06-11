import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  tmpItems: [],
  tmpItem: {
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

/// TmpItems
const fetchTmpItemsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTmpItemsSuccess = (state, action) => {
  return updateObject(state, {
    tmpItems: action.tmpItems,
    loading: false,
  });
};

const fetchTmpItemsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// TmpItems

/// TmpItem
const fetchTmpItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTmpItemSuccess = (state, action) => {
  return updateObject(state, {
    tmpItem: action.tmpItem,
    loading: false,
  });
};

const fetchTmpItemFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// TmpItem

const saveTmpItemStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveTmpItemSuccess = (state, action) => {
  return updateObject(state, {
    tmpItem: action.tmpItem,
    loading: false,
    saved: true,
  });
};

const saveTmpItemFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TMPITEMS_START:
      return fetchTmpItemsStart(state, action);
    case actionTypes.FETCH_TMPITEMS_SUCCESS:
      return fetchTmpItemsSuccess(state, action);
    case actionTypes.FETCH_TMPITEMS_FAIL:
      return fetchTmpItemsFail(state, action);
    case actionTypes.FETCH_TMPITEM_START:
      return fetchTmpItemStart(state, action);
    case actionTypes.FETCH_TMPITEM_SUCCESS:
      return fetchTmpItemSuccess(state, action);
    case actionTypes.FETCH_TMPITEM_FAIL:
      return fetchTmpItemFail(state, action);
    case actionTypes.UPDATE_TMPITEM:
      return updateObject(state, { tmpItem: action.tmpItem });
    case actionTypes.RESET_TMPITEM:
      return updateObject(state, initialState);
    case actionTypes.SAVE_TMPITEM_START:
      return saveTmpItemStart(state, action);
    case actionTypes.SAVE_TMPITEM_SUCCESS:
      return saveTmpItemSuccess(state, action);
    case actionTypes.SAVE_TMPITEM_FAIL:
      return saveTmpItemFail(state, action);
    case actionTypes.DELETE_TMPITEM_START:
      return updateObject(state, {
        tmpItem: action.tmpItem,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_TMPITEM_SUCCESS:
      return updateObject(state, {
        tmpItem: initialState.tmpItem,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_TMPITEM_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_TMPITEM_AUDIT_LOGS_START:
      return updateObject(state, {
        tmpItem: action.tmpItem,
        loading: true,
      });
    case actionTypes.FETCH_TMPITEM_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_TMPITEM_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
