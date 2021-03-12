import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchIllustrationsSaga(action) {
  yield put(actions.fetchIllustrationsStart());
  try {
    const response = yield axios.get("");
    const fetchedIllustrations = response.data;
    yield put(actions.fetchIllustrationsSuccess(fetchedIllustrations));
  } catch (error) {
    yield put(actions.fetchIllustrationsFail(error));
  }
}

export function* watchIllustration() {
  yield takeEvery(actionTypes.FETCH_ILLUSTRATIONS, fetchIllustrationsSaga);
}
