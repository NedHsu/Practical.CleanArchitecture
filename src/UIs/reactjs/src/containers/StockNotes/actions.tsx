import * as actionTypes from "./actionTypes";

/// STOCK_NOTES
export const fetchStockNotesSuccess = (stockNotes) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTES_SUCCESS,
    stockNotes: stockNotes,
  };
};

export const fetchStockNotesFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTES_FAIL,
    error: error,
  };
};

export const fetchStockNotesStart = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTES_START,
    stock: stock,
  };
};

export const fetchStockNotes = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTES,
    stock: stock
  };
};

export const fetchAllStockNotes = () => {
  return {
    type: actionTypes.FETCH_ALL_STOCK_NOTES,
  };
};

/// STOCK_NOTES

/// STOCK_NOTE
export const fetchStockNoteSuccess = (stockNote) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_SUCCESS,
    stockNote: stockNote,
  };
};

export const fetchStockNoteFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_FAIL,
    error: error,
  };
};

export const fetchStockNoteStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_START,
  };
};

export const fetchStockNote = (id) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE,
    id: id,
  };
};
/// STOCK_NOTE

/// UPDATE STOCK_NOTE
export const updateStockNote = (stockNote) => {
  return {
    type: actionTypes.UPDATE_STOCK_NOTE,
    stockNote: stockNote,
  };
};

export const resetStockNote = () => {
  return {
    type: actionTypes.RESET_STOCK_NOTE,
  };
};
/// UPDATE STOCK_NOTE

/// SAVE STOCK_NOTE
export const saveStockNoteSuccess = (stockNote) => {
  return {
    type: actionTypes.SAVE_STOCK_NOTE_SUCCESS,
    stockNote: stockNote,
  };
};

export const saveStockNoteFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_NOTE_FAIL,
    error: error,
  };
};

export const saveStockNoteStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_NOTE_START,
  };
};

export const saveStockNote = (stockNote) => {
  return {
    type: actionTypes.SAVE_STOCK_NOTE,
    stockNote: stockNote,
  };
};
/// SAVE STOCK_NOTE

/// DELETE STOCK_NOTE
export const deleteStockNoteSuccess = (stockNote) => {
  return {
    type: actionTypes.DELETE_STOCK_NOTE_SUCCESS,
    stockNote: stockNote,
  };
};

export const deleteStockNoteFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_NOTE_FAIL,
    error: error,
  };
};

export const deleteStockNoteStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_NOTE_START,
  };
};

export const deleteStockNote = (stockNote) => {
  return {
    type: actionTypes.DELETE_STOCK_NOTE,
    stockNote: stockNote,
  };
};
/// DELETE STOCK_NOTE

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stockNote) => {
  return {
    type: actionTypes.FETCH_STOCK_NOTE_AUDIT_LOGS,
    stockNote: stockNote,
  };
};
/// VIEW AUDIT LOGS
