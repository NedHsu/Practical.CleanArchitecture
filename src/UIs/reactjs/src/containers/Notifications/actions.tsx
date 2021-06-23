import * as actionTypes from "./actionTypes";

/// NOTIFICATIONS
export const fetchNotificationsSuccess = (tmpItems) => {
  return {
    type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
    tmpItems: tmpItems,
  };
};

export const fetchNotificationsFail = (error) => {
  return {
    type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
    error: error,
  };
};

export const fetchNotificationsStart = () => {
  return {
    type: actionTypes.FETCH_NOTIFICATIONS_START,
  };
};

export const fetchNotifications = () => {
  return {
    type: actionTypes.FETCH_NOTIFICATIONS,
  };
};
/// NOTIFICATIONS

/// NOTIFICATION
export const fetchNotificationSuccess = (tmpItem) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
    tmpItem: tmpItem,
  };
};

export const fetchNotificationFail = (error) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_FAIL,
    error: error,
  };
};

export const fetchNotificationStart = () => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_START,
  };
};

export const fetchNotification = (id) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION,
    id: id,
  };
};
/// NOTIFICATION

/// UPDATE NOTIFICATION
export const updateNotification = (tmpItem) => {
  return {
    type: actionTypes.UPDATE_NOTIFICATION,
    tmpItem: tmpItem,
  };
};

export const resetNotification = () => {
  return {
    type: actionTypes.RESET_NOTIFICATION,
  };
};
/// UPDATE NOTIFICATION

/// SAVE NOTIFICATION
export const saveNotificationSuccess = (tmpItem) => {
  return {
    type: actionTypes.SAVE_NOTIFICATION_SUCCESS,
    tmpItem: tmpItem,
  };
};

export const saveNotificationFail = (error) => {
  return {
    type: actionTypes.SAVE_NOTIFICATION_FAIL,
    error: error,
  };
};

export const saveNotificationStart = () => {
  return {
    type: actionTypes.SAVE_NOTIFICATION_START,
  };
};

export const saveNotification = (tmpItem) => {
  return {
    type: actionTypes.SAVE_NOTIFICATION,
    tmpItem: tmpItem,
  };
};
/// SAVE NOTIFICATION

/// DELETE NOTIFICATION
export const deleteNotificationSuccess = (tmpItem) => {
  return {
    type: actionTypes.DELETE_NOTIFICATION_SUCCESS,
  };
};

export const deleteNotificationFail = (error) => {
  return {
    type: actionTypes.DELETE_NOTIFICATION_FAIL,
    error: error,
  };
};

export const deleteNotificationStart = () => {
  return {
    type: actionTypes.DELETE_NOTIFICATION_START,
  };
};

export const deleteNotification = (tmpItem) => {
  return {
    type: actionTypes.DELETE_NOTIFICATION,
    tmpItem: tmpItem,
  };
};
/// DELETE NOTIFICATION

/// NOTIFICATION
export const connectNotificationSuccess = (info) => {
  return {
    type: actionTypes.CONNECT_NOTIFICATION_SUCCESS,
    info: info,
  };
};

export const connectNotificationFail = (error) => {
  return {
    type: actionTypes.CONNECT_NOTIFICATION_ERROR,
    error: error,
  };
};

export const connectNotificationStart = () => {
  return {
    type: actionTypes.CONNECT_NOTIFICATION_START,
  };
};

export const connectNotification = () => {
  return {
    type: actionTypes.CONNECT_NOTIFICATION
  };
};

export const notificationReceived = (notification) => {
  return {
    type: actionTypes.NOTIFICATION_RECEIVED,
    notification: notification,
  };
};
/// NOTIFICATION