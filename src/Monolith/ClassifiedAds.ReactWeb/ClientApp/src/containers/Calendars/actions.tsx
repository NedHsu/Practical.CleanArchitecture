import * as actionTypes from "./actionTypes";

/// CALENDARS
export const fetchCalendarsSuccess = (calendars) => {
  return {
    type: actionTypes.FETCH_CALENDARS_SUCCESS,
    calendars: calendars,
  };
};

export const fetchCalendarsFail = (error) => {
  return {
    type: actionTypes.FETCH_CALENDARS_FAIL,
    error: error,
  };
};

export const fetchCalendarsStart = () => {
  return {
    type: actionTypes.FETCH_CALENDARS_START,
  };
};

export const fetchCalendars = () => {
  return {
    type: actionTypes.FETCH_CALENDARS,
  };
};
/// CALENDARS

/// CALENDAR
export const fetchCalendarSuccess = (calendar) => {
  return {
    type: actionTypes.FETCH_CALENDAR_SUCCESS,
    calendar: calendar,
  };
};

export const fetchCalendarFail = (error) => {
  return {
    type: actionTypes.FETCH_CALENDAR_FAIL,
    error: error,
  };
};

export const fetchCalendarStart = () => {
  return {
    type: actionTypes.FETCH_CALENDAR_START,
  };
};

export const fetchCalendar = (id) => {
  return {
    type: actionTypes.FETCH_CALENDAR,
    id: id,
  };
};
/// CALENDAR

/// UPDATE CALENDAR
export const updateCalendar = (calendar) => {
  return {
    type: actionTypes.UPDATE_CALENDAR,
    calendar: calendar,
  };
};

export const resetCalendar = () => {
  return {
    type: actionTypes.RESET_CALENDAR,
  };
};
/// UPDATE CALENDAR

/// SAVE CALENDAR
export const saveCalendarSuccess = (calendar) => {
  return {
    type: actionTypes.SAVE_CALENDAR_SUCCESS,
    calendar: calendar,
  };
};

export const saveCalendarFail = (error) => {
  return {
    type: actionTypes.SAVE_CALENDAR_FAIL,
    error: error,
  };
};

export const saveCalendarStart = () => {
  return {
    type: actionTypes.SAVE_CALENDAR_START,
  };
};

export const saveCalendar = (calendar) => {
  return {
    type: actionTypes.SAVE_CALENDAR,
    calendar: calendar,
  };
};
/// SAVE CALENDAR

/// DELETE CALENDAR
export const deleteCalendarSuccess = (calendar) => {
  return {
    type: actionTypes.DELETE_CALENDAR_SUCCESS,
  };
};

export const deleteCalendarFail = (error) => {
  return {
    type: actionTypes.DELETE_CALENDAR_FAIL,
    error: error,
  };
};

export const deleteCalendarStart = () => {
  return {
    type: actionTypes.DELETE_CALENDAR_START,
  };
};

export const deleteCalendar = (calendar) => {
  return {
    type: actionTypes.DELETE_CALENDAR,
    calendar: calendar,
  };
};
/// DELETE CALENDAR
