import { put, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchCalendarsSaga(action) {
  yield put(actions.fetchCalendarsStart());
  try {
    const response = yield axios.get("");
    const fetchedCalendars = response.data;
    yield put(actions.fetchCalendarsSuccess(fetchedCalendars));
  } catch (error) {
    yield put(actions.fetchCalendarsFail(error));
  }
}

export function* fetchCalendarSaga(action) {
  yield put(actions.fetchCalendarStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedCalendar = response.data;
    yield put(actions.fetchCalendarSuccess(fetchedCalendar));
  } catch (error) {
    yield put(actions.fetchCalendarFail(error));
  }
}

export function* saveCalendarSaga(action) {
  yield put(actions.saveCalendarStart());
  try {
    const response = action.calendar.id
      ? yield axios.put(action.calendar.id, action.calendar)
      : yield axios.post("", action.calendar);
    const calendar = response.data;
    yield put(actions.saveCalendarSuccess(calendar));
  } catch (error) {
    console.log(error);
    yield put(actions.saveCalendarFail(error));
  }
}

export function* deleteCalendarSaga(action) {
  yield put(actions.deleteCalendarStart());
  try {
    const response = yield axios.delete(action.calendar.id, action.calendar);
    yield put(actions.deleteCalendarSuccess(action.calendar));
    yield put(actions.fetchCalendars());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteCalendarFail(error));
  }
}

export function* watchCalendar() {
  yield takeEvery(actionTypes.FETCH_CALENDARS, fetchCalendarsSaga);
  yield takeEvery(actionTypes.FETCH_CALENDAR, fetchCalendarSaga);
  yield takeEvery(actionTypes.SAVE_CALENDAR, saveCalendarSaga);
  yield takeEvery(actionTypes.DELETE_CALENDAR, deleteCalendarSaga);
}
