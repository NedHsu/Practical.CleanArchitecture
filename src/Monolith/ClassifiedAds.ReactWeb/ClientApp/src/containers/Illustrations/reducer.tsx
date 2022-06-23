import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  illustrations: [],
  illustration: {
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

/// Illustrations
const fetchIllustrationsStart = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ILLUSTRATIONS:
      return fetchIllustrationsStart(state, action);
    default:
      return state;
  }
};

export default reducer;
