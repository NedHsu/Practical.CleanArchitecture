import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  chats: [],
  chat: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
  connection: null,
  messages: [],
};

/// Chats
const fetchChatsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchChatsSuccess = (state, action) => {
  return updateObject(state, {
    chats: action.chats,
    loading: false,
  });
};

const fetchChatsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Chats

/// Chat
const fetchChatStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchChatSuccess = (state, action) => {
  return updateObject(state, {
    connection: action.connection,
    loading: false,
  });
};

const fetchChatFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Chat

/// Connection
const connectChatStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const connectChatSuccess = (state, action) => {
  return updateObject(state, {
    chat: action.chat,
    loading: false,
  });
};

const connectChatError = (state, action) => {
  return updateObject(state, { loading: false });
};

const messageReceived = (state, action) => {
  console.log("messageReceived");
  return updateObject(state, { messages: [...state.messages, action.message] });
};

/// Chat

const saveChatStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveChatSuccess = (state, action) => {
  return updateObject(state, {
    chat: action.chat,
    loading: false,
    saved: true,
  });
};

const saveChatFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATS_START:
      return fetchChatsStart(state, action);
    case actionTypes.FETCH_CHATS_SUCCESS:
      return fetchChatsSuccess(state, action);
    case actionTypes.FETCH_CHATS_FAIL:
      return fetchChatsFail(state, action);
    case actionTypes.FETCH_CHAT_START:
      return fetchChatStart(state, action);
    case actionTypes.FETCH_CHAT_SUCCESS:
      return fetchChatSuccess(state, action);
    case actionTypes.FETCH_CHAT_FAIL:
      return fetchChatFail(state, action);
    case actionTypes.CONNECT_CHAT_START:
      return connectChatStart(state, action);
    case actionTypes.CONNECT_CHAT_SUCCESS:
      return connectChatSuccess(state, action);
    case actionTypes.CONNECT_CHAT_ERROR:
      return connectChatError(state, action);
    case actionTypes.MESSAGE_RECEIVED:
      return messageReceived(state, action);
    case actionTypes.UPDATE_CHAT:
      return updateObject(state, { chat: action.chat });
    case actionTypes.RESET_CHAT:
      return updateObject(state, initialState);
    case actionTypes.SAVE_CHAT_START:
      return saveChatStart(state, action);
    case actionTypes.SAVE_CHAT_SUCCESS:
      return saveChatSuccess(state, action);
    case actionTypes.SAVE_CHAT_FAIL:
      return saveChatFail(state, action);
    case actionTypes.DELETE_CHAT_START:
      return updateObject(state, {
        chat: action.chat,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_CHAT_SUCCESS:
      return updateObject(state, {
        chat: initialState.chat,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_CHAT_FAIL:
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
