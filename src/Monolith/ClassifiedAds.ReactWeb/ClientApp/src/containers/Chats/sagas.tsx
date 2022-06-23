import { put, take, takeEvery, call } from "redux-saga/effects";
import axios from "./axios";


import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { HubConnectionBuilder } from "@microsoft/signalr";
import env from "../../environments";
import authService from "../Auth/authService";
import { channel } from "redux-saga";
import dayjs from "dayjs";

const messageChannel = channel()

export function* fetchChatsSaga(action) {
  yield put(actions.fetchChatsStart());
  try {
    const response = yield axios.get("");
    const fetchedChats = response.data;
    yield put(actions.fetchChatsSuccess(fetchedChats));
  } catch (error) {
    yield put(actions.fetchChatsFail(error));
  }
}

export function* fetchChatSaga(action) {
  yield put(actions.fetchChatStart());
  try {
    const response = yield axios.get(action.id);
    const fetchedChat = response.data;
    yield put(actions.fetchChatSuccess(fetchedChat));
  } catch (error) {
    yield put(actions.fetchChatFail(error));
  }
}

export function* connectChatsSaga(action) {
  console.log("connectChatsSaga");
  yield put(actions.connectChatStart());
  try {
    const connection = new HubConnectionBuilder()
      .withUrl(env.ResourceServer.ChatHub, {
        accessTokenFactory: authService.getAccessToken
      })
      .withAutomaticReconnect()
      .build();

    connection.on("messageReceived", (username: string, message: string) => {
      let now = dayjs();
      messageChannel.put(actions.messageReceived({
        username,
        message,
        time: now.format("YYYY-MM-DD HH:mm"),
        key: now.valueOf()
      }));
    });

    yield connection.start()
      .catch(err => console.log(err));
    yield put(actions.connectChatSuccess(connection));
    // yield put(actions.fetchChatSuccess(fetchedChat));
  } catch (error) {
    yield put(actions.fetchChatFail(error));
  }
}

export function* saveChatSaga(action) {
  yield put(actions.saveChatStart());
  try {
    const response = action.chatItem.id
      ? yield axios.put(action.chatItem.id, action.chatItem)
      : yield axios.post("", action.chatItem);
    const chatItem = response.data;
    yield put(actions.saveChatSuccess(chatItem));
  } catch (error) {
    console.log(error);
    yield put(actions.saveChatFail(error));
  }
}

export function* deleteChatSaga(action) {
  yield put(actions.deleteChatStart());
  try {
    const response = yield axios.delete(action.chatItem.id, action.chatItem);
    yield put(actions.deleteChatSuccess(action.chatItem));
    yield put(actions.fetchChats());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteChatFail(error));
  }
}

export function* sendMessageSaga(action) {
  if (!action.chatItem || !action.connection) {
    return;
  }
  try {
    yield action.connection.invoke("SendMessageSelf", action.chatItem.content).catch(err => console.error(err));;
    yield put(actions.sendMessageSuccess(action.chatItem));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteChatFail(error));
  }
}

export function* watchChat() {
  yield takeEvery(actionTypes.CONNECT_CHAT, connectChatsSaga);
  yield takeEvery(actionTypes.FETCH_CHATS, fetchChatsSaga);
  yield takeEvery(actionTypes.FETCH_CHAT, fetchChatSaga);
  yield takeEvery(actionTypes.SAVE_CHAT, saveChatSaga);
  yield takeEvery(actionTypes.DELETE_CHAT, deleteChatSaga);
  yield takeEvery(actionTypes.SEND_MESSAGE, sendMessageSaga);
  while (true) {
    const action = yield take(messageChannel);
    yield put(action);
  }
}
