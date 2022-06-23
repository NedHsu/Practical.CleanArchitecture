import * as actionTypes from "./actionTypes";

/// JOB_SRCS
export const fetchJobSrcsSuccess = (jobSrcs) => {
  return {
    type: actionTypes.FETCH_JOB_SRCS_SUCCESS,
    jobSrcs: jobSrcs,
  };
};

export const fetchJobSrcsFail = (error) => {
  return {
    type: actionTypes.FETCH_JOB_SRCS_FAIL,
    error: error,
  };
};

export const fetchJobSrcsStart = () => {
  return {
    type: actionTypes.FETCH_JOB_SRCS_START,
  };
};

export const fetchJobSrcs = () => {
  return {
    type: actionTypes.FETCH_JOB_SRCS,
  };
};
/// JOB_SRCS

/// JOB_SRC
export const fetchJobSrcSuccess = (jobSrc) => {
  return {
    type: actionTypes.FETCH_JOB_SRC_SUCCESS,
    jobSrc: jobSrc,
  };
};

export const fetchJobSrcFail = (error) => {
  return {
    type: actionTypes.FETCH_JOB_SRC_FAIL,
    error: error,
  };
};

export const fetchJobSrcStart = () => {
  return {
    type: actionTypes.FETCH_JOB_SRC_START,
  };
};

export const fetchJobSrc = (provider, name) => {
  return {
    type: actionTypes.FETCH_JOB_SRC,
    provider: provider,
    name: name
  };
};
/// JOB_SRC

/// UPDATE JOB_SRC
export const updateJobSrc = (jobSrc) => {
  return {
    type: actionTypes.UPDATE_JOB_SRC,
    jobSrc: jobSrc,
  };
};

export const resetJobSrc = () => {
  return {
    type: actionTypes.RESET_JOB_SRC,
  };
};
/// UPDATE JOB_SRC

/// SAVE JOB_SRC
export const saveJobSrcSuccess = (jobSrc) => {
  return {
    type: actionTypes.SAVE_JOB_SRC_SUCCESS,
    jobSrc: jobSrc,
  };
};

export const saveJobSrcFail = (error) => {
  return {
    type: actionTypes.SAVE_JOB_SRC_FAIL,
    error: error,
  };
};

export const saveJobSrcStart = () => {
  return {
    type: actionTypes.SAVE_JOB_SRC_START,
  };
};

export const saveJobSrc = (jobSrc) => {
  return {
    type: actionTypes.SAVE_JOB_SRC,
    jobSrc: jobSrc,
  };
};
/// SAVE JOB_SRC

/// DELETE JOB_SRC
export const deleteJobSrcSuccess = (jobSrc) => {
  return {
    type: actionTypes.DELETE_JOB_SRC_SUCCESS,
  };
};

export const deleteJobSrcFail = (error) => {
  return {
    type: actionTypes.DELETE_JOB_SRC_FAIL,
    error: error,
  };
};

export const deleteJobSrcStart = () => {
  return {
    type: actionTypes.DELETE_JOB_SRC_START,
  };
};

export const deleteJobSrc = (jobSrc) => {
  return {
    type: actionTypes.DELETE_JOB_SRC,
    jobSrc: jobSrc,
  };
};
/// DELETE JOB_SRC

//--export
