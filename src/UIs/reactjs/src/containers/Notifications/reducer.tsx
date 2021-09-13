import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  notifications: [],
  notification: {
    name: "",
    code: "",
    description: "",
  },
  connection: null,
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// Notifications
const fetchNotificationsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchNotificationsSuccess = (state, action) => {
  return updateObject(state, {
    notifications: action.notifications,
    loading: false,
  });
};

const fetchNotificationsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Notifications

/// Notification
const fetchNotificationStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchNotificationSuccess = (state, action) => {
  return updateObject(state, {
    notification: action.notification,
    loading: false,
  });
};

const fetchNotificationFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Notification

/// Connection
const connectNotificationStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const connectNotificationSuccess = (state, action) => {
  return updateObject(state, {
    connection: action.connection,
    loading: false,
  });
};

const connectNotificationError = (state, action) => {
  return updateObject(state, { loading: false });
};

const notificationReceived = (state, action) => {
  console.log("notificationReceived");
  return updateObject(state, { notifications: [...state.notifications, action.notification] });
};

/// Notification

const saveNotificationStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveNotificationSuccess = (state, action) => {
  return updateObject(state, {
    notification: action.notification,
    loading: false,
    saved: true,
  });
};

const saveNotificationFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NOTIFICATIONS_START:
      return fetchNotificationsStart(state, action);
    case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return fetchNotificationsSuccess(state, action);
    case actionTypes.FETCH_NOTIFICATIONS_FAIL:
      return fetchNotificationsFail(state, action);
    case actionTypes.FETCH_NOTIFICATION_START:
      return fetchNotificationStart(state, action);
    case actionTypes.FETCH_NOTIFICATION_SUCCESS:
      return fetchNotificationSuccess(state, action);
    case actionTypes.FETCH_NOTIFICATION_FAIL:
      return fetchNotificationFail(state, action);
    case actionTypes.CONNECT_NOTIFICATION_START:
      return connectNotificationStart(state, action);
    case actionTypes.CONNECT_NOTIFICATION_SUCCESS:
      return connectNotificationSuccess(state, action);
    case actionTypes.CONNECT_NOTIFICATION_ERROR:
      return connectNotificationError(state, action);
    case actionTypes.NOTIFICATION_RECEIVED:
      return notificationReceived(state, action);
    case actionTypes.UPDATE_NOTIFICATION:
      return updateObject(state, { notification: action.notification });
    case actionTypes.RESET_NOTIFICATION:
      return updateObject(state, initialState);
    case actionTypes.SAVE_NOTIFICATION_START:
      return saveNotificationStart(state, action);
    case actionTypes.SAVE_NOTIFICATION_SUCCESS:
      return saveNotificationSuccess(state, action);
    case actionTypes.SAVE_NOTIFICATION_FAIL:
      return saveNotificationFail(state, action);
    case actionTypes.DELETE_NOTIFICATION_START:
      return updateObject(state, {
        notification: action.notification,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_NOTIFICATION_SUCCESS:
      return updateObject(state, {
        notification: initialState.notification,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_NOTIFICATION_FAIL:
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
