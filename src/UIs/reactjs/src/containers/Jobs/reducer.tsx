import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  jobs: [],
  job: {
    name: "",
    code: "",
    description: "",
  },
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// Jobs
const fetchJobsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchJobsSuccess = (state, action) => {
  return updateObject(state, {
    jobs: action.jobs,
    loading: false,
  });
};

const fetchJobsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Jobs

/// Job
const fetchJobStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchJobSuccess = (state, action) => {
  return updateObject(state, {
    job: action.job,
    loading: false,
  });
};

const fetchJobFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Job

const saveJobStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveJobSuccess = (state, action) => {
  return updateObject(state, {
    job: action.job,
    loading: false,
    saved: true,
  });
};

const saveJobFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};
//--functions
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOBS_START:
      return fetchJobsStart(state, action);
    case actionTypes.FETCH_JOBS_SUCCESS:
      return fetchJobsSuccess(state, action);
    case actionTypes.FETCH_JOBS_FAIL:
      return fetchJobsFail(state, action);
    case actionTypes.FETCH_JOB_START:
      return fetchJobStart(state, action);
    case actionTypes.FETCH_JOB_SUCCESS:
      return fetchJobSuccess(state, action);
    case actionTypes.FETCH_JOB_FAIL:
      return fetchJobFail(state, action);
    case actionTypes.UPDATE_JOB:
      return updateObject(state, { job: action.job });
    case actionTypes.RESET_JOB:
      return updateObject(state, initialState);
    case actionTypes.SAVE_JOB_START:
      return saveJobStart(state, action);
    case actionTypes.SAVE_JOB_SUCCESS:
      return saveJobSuccess(state, action);
    case actionTypes.SAVE_JOB_FAIL:
      return saveJobFail(state, action);
    case actionTypes.DELETE_JOB_START:
      return updateObject(state, {
        job: action.job,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_JOB_SUCCESS:
      return updateObject(state, {
        job: initialState.job,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_JOB_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    //--case
    case actionTypes.FETCH_JOB_SRCS_START:
      return fetchJobSrcsStart(state, action);
    case actionTypes.FETCH_JOB_SRCS_SUCCESS:
      return fetchJobSrcsSuccess(state, action);
    case actionTypes.FETCH_JOB_SRCS_FAIL:
      return fetchJobSrcsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
