import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  calendars: [],
  calendar: {
    name: "",
    code: "",
    description: "",
  },
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// Calendars
const fetchCalendarsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCalendarsSuccess = (state, action) => {
  return updateObject(state, {
    calendars: action.calendars,
    loading: false,
  });
};

const fetchCalendarsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Calendars

/// Calendar
const fetchCalendarStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCalendarSuccess = (state, action) => {
  return updateObject(state, {
    calendar: action.calendar,
    loading: false,
  });
};

const fetchCalendarFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Calendar

const saveCalendarStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveCalendarSuccess = (state, action) => {
  return updateObject(state, {
    calendar: action.calendar,
    loading: false,
    saved: true,
  });
};

const saveCalendarFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CALENDARS_START:
      return fetchCalendarsStart(state, action);
    case actionTypes.FETCH_CALENDARS_SUCCESS:
      return fetchCalendarsSuccess(state, action);
    case actionTypes.FETCH_CALENDARS_FAIL:
      return fetchCalendarsFail(state, action);
    case actionTypes.FETCH_CALENDAR_START:
      return fetchCalendarStart(state, action);
    case actionTypes.FETCH_CALENDAR_SUCCESS:
      return fetchCalendarSuccess(state, action);
    case actionTypes.FETCH_CALENDAR_FAIL:
      return fetchCalendarFail(state, action);
    case actionTypes.UPDATE_CALENDAR:
      return updateObject(state, { calendar: action.calendar });
    case actionTypes.RESET_CALENDAR:
      return updateObject(state, initialState);
    case actionTypes.SAVE_CALENDAR_START:
      return saveCalendarStart(state, action);
    case actionTypes.SAVE_CALENDAR_SUCCESS:
      return saveCalendarSuccess(state, action);
    case actionTypes.SAVE_CALENDAR_FAIL:
      return saveCalendarFail(state, action);
    case actionTypes.DELETE_CALENDAR_START:
      return updateObject(state, {
        calendar: action.calendar,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_CALENDAR_SUCCESS:
      return updateObject(state, {
        calendar: initialState.calendar,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_CALENDAR_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    default:
      return state;
  }
};

export default reducer;
