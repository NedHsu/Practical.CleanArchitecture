import * as actionTypes from "./actionTypes";

/// CHATS
export const fetchChatsSuccess = (tmpItems) => {
  return {
    type: actionTypes.FETCH_CHATS_SUCCESS,
    tmpItems: tmpItems,
  };
};

export const fetchChatsFail = (error) => {
  return {
    type: actionTypes.FETCH_CHATS_FAIL,
    error: error,
  };
};

export const fetchChatsStart = () => {
  return {
    type: actionTypes.FETCH_CHATS_START,
  };
};

export const fetchChats = () => {
  return {
    type: actionTypes.FETCH_CHATS,
  };
};
/// CHATS

/// CHAT
export const fetchChatSuccess = (connection) => {
  return {
    type: actionTypes.FETCH_CHAT_SUCCESS,
    connection: connection,
  };
};

export const fetchChatFail = (error) => {
  return {
    type: actionTypes.FETCH_CHAT_FAIL,
    error: error,
  };
};

export const fetchChatStart = () => {
  return {
    type: actionTypes.FETCH_CHAT_START,
  };
};

export const fetchChat = (id) => {
  return {
    type: actionTypes.FETCH_CHAT,
    id: id,
  };
};
/// CHAT

/// CHAT
export const connectChatSuccess = (info) => {
  return {
    type: actionTypes.CONNECT_CHAT_SUCCESS,
    info: info,
  };
};

export const connectChatFail = (error) => {
  return {
    type: actionTypes.CONNECT_CHAT_ERROR,
    error: error,
  };
};

export const connectChatStart = () => {
  return {
    type: actionTypes.CONNECT_CHAT_START,
  };
};

export const connectChat = () => {
  return {
    type: actionTypes.CONNECT_CHAT
  };
};

export const messageReceived = (message) => {
  return {
    type: actionTypes.MESSAGE_RECEIVED,
    message: message,
  };
};
/// CHAT

/// UPDATE CHAT
export const updateChat = (tmpItem) => {
  return {
    type: actionTypes.UPDATE_CHAT,
    tmpItem: tmpItem,
  };
};

export const resetChat = () => {
  return {
    type: actionTypes.RESET_CHAT,
  };
};
/// UPDATE CHAT

/// SAVE CHAT
export const saveChatSuccess = (tmpItem) => {
  return {
    type: actionTypes.SAVE_CHAT_SUCCESS,
    tmpItem: tmpItem,
  };
};

export const saveChatFail = (error) => {
  return {
    type: actionTypes.SAVE_CHAT_FAIL,
    error: error,
  };
};

export const saveChatStart = () => {
  return {
    type: actionTypes.SAVE_CHAT_START,
  };
};

export const saveChat = (tmpItem) => {
  return {
    type: actionTypes.SAVE_CHAT,
    tmpItem: tmpItem,
  };
};
/// SAVE CHAT

/// DELETE CHAT
export const deleteChatSuccess = (tmpItem) => {
  return {
    type: actionTypes.DELETE_CHAT_SUCCESS,
  };
};

export const deleteChatFail = (error) => {
  return {
    type: actionTypes.DELETE_CHAT_FAIL,
    error: error,
  };
};

export const deleteChatStart = () => {
  return {
    type: actionTypes.DELETE_CHAT_START,
  };
};

export const deleteChat = (tmpItem) => {
  return {
    type: actionTypes.DELETE_CHAT,
    tmpItem: tmpItem,
  };
};
/// DELETE CHAT