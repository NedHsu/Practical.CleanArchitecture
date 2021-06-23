import { put, take, takeEvery } from "redux-saga/effects";
import axios from "./axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { channel } from "redux-saga";
import authService from "../Auth/authService";
import { HubConnectionBuilder } from "@microsoft/signalr";
import dayjs from "dayjs";
import env from "../../environments";

const notificationChannel = channel();

export function* fetchNotificationsSaga(action) {
  yield put(actions.fetchNotificationsStart());
  try {
    const response = yield axios.get("");
    const fetchedNotifications = response.data;
    yield put(actions.fetchNotificationsSuccess(fetchedNotifications));
  } catch (error) {
    yield put(actions.fetchNotificationsFail(error));
  }
}

export function* fetchNotificationSaga(action) {
  yield put(actions.fetchNotificationStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedNotification = response.data;
    yield put(actions.fetchNotificationSuccess(fetchedNotification));
  } catch (error) {
    yield put(actions.fetchNotificationFail(error));
  }
}

export function* connectNotificationsSaga(action) {
  console.log("connectNotificationsSaga");
  yield put(actions.connectNotificationStart());
  try {
    const connection = new HubConnectionBuilder()
      .withUrl(env.ResourceServer.NotificationHub, {
        accessTokenFactory: authService.getAccessToken
      })
      .withAutomaticReconnect()
      .build();

    connection.on("notificationReceived", (username: string, notification: string) => {
      console.log("notificationReceived");
      notificationChannel.put(actions.notificationReceived({
        username,
        notification,
        time: dayjs().format("YYYY-MM-DD HH:mm"),
      }));
    });

    connection.start()
      .catch(err => console.log(err))
      .then(() => {
        put(actions.connectNotificationSuccess(connection));
      });
    // yield put(actions.fetchNotificationSuccess(fetchedNotification));
  } catch (error) {
    yield put(actions.fetchNotificationFail(error));
  }
}

export function* saveNotificationSaga(action) {
  yield put(actions.saveNotificationStart());
  try {
    const response = action.tmpItem.id
      ? yield axios.put(action.tmpItem.id, action.tmpItem)
      : yield axios.post("", action.tmpItem);
    const tmpItem = response.data;
    yield put(actions.saveNotificationSuccess(tmpItem));
  } catch (error) {
    console.log(error);
    yield put(actions.saveNotificationFail(error));
  }
}

export function* deleteNotificationSaga(action) {
  yield put(actions.deleteNotificationStart());
  try {
    const response = yield axios.delete(action.tmpItem.id, action.tmpItem);
    yield put(actions.deleteNotificationSuccess(action.tmpItem));
    yield put(actions.fetchNotifications());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteNotificationFail(error));
  }
}

export function* watchNotification() {
  yield takeEvery(actionTypes.FETCH_NOTIFICATIONS, fetchNotificationsSaga);
  yield takeEvery(actionTypes.FETCH_NOTIFICATION, fetchNotificationSaga);
  yield takeEvery(actionTypes.SAVE_NOTIFICATION, saveNotificationSaga);
  yield takeEvery(actionTypes.DELETE_NOTIFICATION, deleteNotificationSaga);
  yield takeEvery(actionTypes.CONNECT_NOTIFICATION, connectNotificationsSaga);
  const action = yield take(notificationChannel);
  yield put(action);
}
