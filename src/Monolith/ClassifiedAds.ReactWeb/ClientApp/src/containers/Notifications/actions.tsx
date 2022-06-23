import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";

/// NOTIFICATIONS
export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
    notifications: notifications,
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
export const fetchNotificationSuccess = (notification) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
    notification: notification,
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
export const updateNotification = (notification) => {
  return {
    type: actionTypes.UPDATE_NOTIFICATION,
    notification: notification,
  };
};

export const resetNotification = () => {
  return {
    type: actionTypes.RESET_NOTIFICATION,
  };
};
/// UPDATE NOTIFICATION

/// SAVE NOTIFICATION
export const saveNotificationSuccess = (notification) => {
  return {
    type: actionTypes.SAVE_NOTIFICATION_SUCCESS,
    notification: notification,
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

export const saveNotification = (notification) => {
  return {
    type: actionTypes.SAVE_NOTIFICATION,
    notification: notification,
  };
};
/// SAVE NOTIFICATION

/// DELETE NOTIFICATION
export const deleteNotificationSuccess = (notification) => {
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

export const deleteNotification = (notification) => {
  return {
    type: actionTypes.DELETE_NOTIFICATION,
    notification: notification,
  };
};
/// DELETE NOTIFICATION

/// NOTIFICATION
export const connectNotificationSuccess = (connection) => {
  return {
    type: actionTypes.CONNECT_NOTIFICATION_SUCCESS,
    connection: connection,
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
  console.log(notification);
  toast(notification.notification, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  return {
    type: actionTypes.NOTIFICATION_RECEIVED,
    notification: notification,
  };
};

export const sendNotification = (notification) => {
  return {
    type: actionTypes.SEND_NOTIFICATION,
    notification: notification,
  };
};
/// NOTIFICATION