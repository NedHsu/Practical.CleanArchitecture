import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchJobsSaga(action) {
  yield put(actions.fetchJobsStart());
  try {
    const response = yield axios.get("");
    const fetchedJobs = response.data;
    yield put(actions.fetchJobsSuccess(fetchedJobs));
  } catch (error) {
    yield put(actions.fetchJobsFail(error));
  }
}

export function* fetchJobSaga(action) {
  yield put(actions.fetchJobStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedJob = response.data;
    yield put(actions.fetchJobSuccess(fetchedJob));
  } catch (error) {
    yield put(actions.fetchJobFail(error));
  }
}

export function* saveJobSaga(action) {
  yield put(actions.saveJobStart());
  try {
    const response = action.job.id
      ? yield axios.put(action.job.id, action.job)
      : yield axios.post("", action.job);
    const job = response.data;
    yield put(actions.saveJobSuccess(job));
  } catch (error) {
    console.log(error);
    yield put(actions.saveJobFail(error));
  }
}

export function* deleteJobSaga(action) {
  yield put(actions.deleteJobStart());
  try {
    const response = yield axios.delete(action.job.id, action.job);
    yield put(actions.deleteJobSuccess(action.job));
    yield put(actions.fetchJobs());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteJobFail(error));
  }
}
//--exportFunctions

export function* watchJob() {
  yield takeEvery(actionTypes.FETCH_JOBS, fetchJobsSaga);
  yield takeEvery(actionTypes.FETCH_JOB, fetchJobSaga);
  yield takeEvery(actionTypes.SAVE_JOB, saveJobSaga);
  yield takeEvery(actionTypes.DELETE_JOB, deleteJobSaga);
  //--yield
}
