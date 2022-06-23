import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { urlParams } from "../../shared/utility";

export function* fetchJobSrcsSaga(action) {
  yield put(actions.fetchJobSrcsStart());
  try {
    const response = yield axios.get("");
    const fetchedJobSrcs = response.data;
    yield put(actions.fetchJobSrcsSuccess(fetchedJobSrcs));
  } catch (error) {
    yield put(actions.fetchJobSrcsFail(error));
  }
}

export function* fetchJobSrcSaga(action) {
  yield put(actions.fetchJobSrcStart());
  try {
    const response = yield axios.get(`${action.provider}/${action.name}`);
    const fetchedJobSrc = response.data;
    yield put(actions.fetchJobSrcSuccess(fetchedJobSrc));
  } catch (error) {
    yield put(actions.fetchJobSrcFail(error));
  }
}

export function* saveJobSrcSaga(action) {
  yield put(actions.saveJobSrcStart());
  try {
    const response = action.jobSrc.id
      ? yield axios.put("", action.jobSrc)
      : yield axios.post("", action.jobSrc);
    const jobSrc = response.data;
    yield put(actions.saveJobSrcSuccess(jobSrc));
  } catch (error) {
    console.log(error);
    yield put(actions.saveJobSrcFail(error));
  }
}

export function* deleteJobSrcSaga(action) {
  yield put(actions.deleteJobSrcStart());
  try {
    const response = yield axios.delete(urlParams({ provider: action.jobSrc.provider, name: action.jobSrc.name }));
    yield put(actions.deleteJobSrcSuccess(action.jobSrc));
    yield put(actions.fetchJobSrcs());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteJobSrcFail(error));
  }
}
//--exportFunctions

export function* watchJobSrc() {
  yield takeEvery(actionTypes.FETCH_JOB_SRCS, fetchJobSrcsSaga);
  yield takeEvery(actionTypes.FETCH_JOB_SRC, fetchJobSrcSaga);
  yield takeEvery(actionTypes.SAVE_JOB_SRC, saveJobSrcSaga);
  yield takeEvery(actionTypes.DELETE_JOB_SRC, deleteJobSrcSaga);
  //--yield
}
