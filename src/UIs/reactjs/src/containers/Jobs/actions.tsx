import * as actionTypes from "./actionTypes";

/// JOBS
export const fetchJobsSuccess = (jobs) => {
  return {
    type: actionTypes.FETCH_JOBS_SUCCESS,
    jobs: jobs,
  };
};

export const fetchJobsFail = (error) => {
  return {
    type: actionTypes.FETCH_JOBS_FAIL,
    error: error,
  };
};

export const fetchJobsStart = () => {
  return {
    type: actionTypes.FETCH_JOBS_START,
  };
};

export const fetchJobs = () => {
  return {
    type: actionTypes.FETCH_JOBS,
  };
};
/// JOBS

/// JOB
export const fetchJobSuccess = (job) => {
  return {
    type: actionTypes.FETCH_JOB_SUCCESS,
    job: job,
  };
};

export const fetchJobFail = (error) => {
  return {
    type: actionTypes.FETCH_JOB_FAIL,
    error: error,
  };
};

export const fetchJobStart = () => {
  return {
    type: actionTypes.FETCH_JOB_START,
  };
};

export const fetchJob = (id) => {
  return {
    type: actionTypes.FETCH_JOB,
    id: id,
  };
};
/// JOB

/// UPDATE JOB
export const updateJob = (job) => {
  return {
    type: actionTypes.UPDATE_JOB,
    job: job,
  };
};

export const resetJob = () => {
  return {
    type: actionTypes.RESET_JOB,
  };
};
/// UPDATE JOB

/// SAVE JOB
export const saveJobSuccess = (job) => {
  return {
    type: actionTypes.SAVE_JOB_SUCCESS,
    job: job,
  };
};

export const saveJobFail = (error) => {
  return {
    type: actionTypes.SAVE_JOB_FAIL,
    error: error,
  };
};

export const saveJobStart = () => {
  return {
    type: actionTypes.SAVE_JOB_START,
  };
};

export const saveJob = (job) => {
  return {
    type: actionTypes.SAVE_JOB,
    job: job,
  };
};
/// SAVE JOB

/// DELETE JOB
export const deleteJobSuccess = (job) => {
  return {
    type: actionTypes.DELETE_JOB_SUCCESS,
  };
};

export const deleteJobFail = (error) => {
  return {
    type: actionTypes.DELETE_JOB_FAIL,
    error: error,
  };
};

export const deleteJobStart = () => {
  return {
    type: actionTypes.DELETE_JOB_START,
  };
};

export const deleteJob = (job) => {
  return {
    type: actionTypes.DELETE_JOB,
    job: job,
  };
};
/// DELETE JOB

//--export
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