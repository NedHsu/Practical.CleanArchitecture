import * as actionTypes from "./actionTypes";

/// CHATS
export const fetchChatsSuccess = (chatItems) => {
  return {
    type: actionTypes.FETCH_CHATS_SUCCESS,
    chatItems: chatItems,
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
export const updateChat = (chatItem) => {
  return {
    type: actionTypes.UPDATE_CHAT,
    chatItem: chatItem,
  };
};

export const resetChat = () => {
  return {
    type: actionTypes.RESET_CHAT,
  };
};
/// UPDATE CHAT

/// SAVE CHAT
export const saveChatSuccess = (chatItem) => {
  return {
    type: actionTypes.SAVE_CHAT_SUCCESS,
    chatItem: chatItem,
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

export const saveChat = (chatItem) => {
  return {
    type: actionTypes.SAVE_CHAT,
    chatItem: chatItem,
  };
};
/// SAVE CHAT

/// DELETE CHAT
export const deleteChatSuccess = (chatItem) => {
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

export const deleteChat = (chatItem) => {
  return {
    type: actionTypes.DELETE_CHAT,
    chatItem: chatItem,
  };
};
/// DELETE CHAT