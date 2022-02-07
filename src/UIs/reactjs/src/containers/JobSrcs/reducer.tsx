import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  jobSrcs: [],
  jobSrc: {
    provider: "",
    name: "",
    src: "",
  },
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// JobSrcs
const fetchJobSrcsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchJobSrcsSuccess = (state, action) => {
  return updateObject(state, {
    jobSrcs: action.jobSrcs,
    loading: false,
  });
};

const fetchJobSrcsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// JobSrcs

/// JobSrc
const fetchJobSrcStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchJobSrcSuccess = (state, action) => {
  return updateObject(state, {
    jobSrc: {
      id: "1",
      ...action.jobSrc
    },
    loading: false,
  });
};

const fetchJobSrcFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// JobSrc

const saveJobSrcStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveJobSrcSuccess = (state, action) => {
  return updateObject(state, {
    jobSrc: action.jobSrc,
    loading: false,
    saved: true,
  });
};

const saveJobSrcFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};
//--functions

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOB_SRCS_START:
      return fetchJobSrcsStart(state, action);
    case actionTypes.FETCH_JOB_SRCS_SUCCESS:
      return fetchJobSrcsSuccess(state, action);
    case actionTypes.FETCH_JOB_SRCS_FAIL:
      return fetchJobSrcsFail(state, action);
    case actionTypes.FETCH_JOB_SRC_START:
      return fetchJobSrcStart(state, action);
    case actionTypes.FETCH_JOB_SRC_SUCCESS:
      return fetchJobSrcSuccess(state, action);
    case actionTypes.FETCH_JOB_SRC_FAIL:
      return fetchJobSrcFail(state, action);
    case actionTypes.UPDATE_JOB_SRC:
      return updateObject(state, { jobSrc: action.jobSrc });
    case actionTypes.RESET_JOB_SRC:
      return updateObject(state, initialState);
    case actionTypes.SAVE_JOB_SRC_START:
      return saveJobSrcStart(state, action);
    case actionTypes.SAVE_JOB_SRC_SUCCESS:
      return saveJobSrcSuccess(state, action);
    case actionTypes.SAVE_JOB_SRC_FAIL:
      return saveJobSrcFail(state, action);
    case actionTypes.DELETE_JOB_SRC_START:
      return updateObject(state, {
        jobSrc: action.jobSrc,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_JOB_SRC_SUCCESS:
      return updateObject(state, {
        jobSrc: initialState.jobSrc,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_JOB_SRC_FAIL:
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
