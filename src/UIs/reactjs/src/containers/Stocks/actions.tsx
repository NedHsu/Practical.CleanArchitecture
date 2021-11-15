import * as actionTypes from "./actionTypes";

/// STOCKS
export const fetchStocksSuccess = (result) => {
  return {
    type: actionTypes.FETCH_STOCKS_SUCCESS,
    stocks: result.items,
    totalCount: result.totalCount,
    totalPage: result.totalPage,
    pageIndex: result.pageIndex,
  };
};

export const fetchGroupStocksSuccess = (stocks) => {
  return {
    type: actionTypes.FETCH_GROUP_STOCKS_SUCCESS,
    stocks: stocks,
  };
};

export const fetchStocksFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCKS_FAIL,
    error: error,
  };
};

export const fetchStocksStart = () => {
  return {
    type: actionTypes.FETCH_STOCKS_START,
  };
};

export const fetchStocks = (options) => {
  return {
    type: actionTypes.FETCH_STOCKS,
    options: options,
  };
};

export const fetchGroupStocks = (group) => {
  return {
    type: actionTypes.FETCH_GROUP_STOCKS,
    group: group,
  };
};

export const fetchStockOptions = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_OPTIONS,
    options: options,
  };
};

export const fetchStockOptionsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_OPTIONS_START,
  };
};


export const fetchStockOptionsSuccess = (result) => {
  return {
    type: actionTypes.FETCH_STOCK_OPTIONS_SUCCESS,
    stocks: result.items,
    totalCount: result.totalCount,
    totalPage: result.totalPage,
  };
};

export const fetchStockOptionsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_OPTIONS_FAIL,
    error: error,
  };
};
/// STOCKS

/// STOCK FUNDERS
export const fetchStockFundersSuccess = (result) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDERS_SUCCESS,
    stockfunders: result,
  };
};

export const fetchStockFundersFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDERS_FAIL,
    error: error,
  };
};

export const fetchStockFundersStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDERS_START,
  };
};

export const fetchStockFunders = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDERS,
    options: options,
  };
};

export const fetchStockFunderScoresSuccess = (result) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDER_SCORES_SUCCESS,
    stockfunderScores: result,
  };
};

export const fetchStockFunderScoresFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDER_SCORES_FAIL,
    error: error,
  };
};

export const fetchStockFunderScoresStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDER_SCORES_START,
  };
};

export const fetchStockFunderScores = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_FUNDER_SCORES,
    options: options,
  };
};
/// STOCKS

/// STOCK REVENUES
export const fetchStockRevenuesSuccess = (result) => {
  return {
    type: actionTypes.FETCH_STOCK_REVENUES_SUCCESS,
    stockRevenues: result,
  };
};

export const fetchStockRevenuesFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_REVENUES_FAIL,
    error: error,
  };
};

export const fetchStockRevenuesStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_REVENUES_START,
  };
};

export const fetchStockRevenues = (options) => {
  return {
    type: actionTypes.FETCH_STOCK_REVENUES,
    options: options,
  };
};
/// STOCKS

/// STOCK
export const fetchStockSuccess = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_SUCCESS,
    stock: stock,
  };
};

export const fetchStockFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_FAIL,
    error: error,
  };
};

export const fetchStockStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_START,
  };
};

export const fetchStock = (id) => {
  return {
    type: actionTypes.FETCH_STOCK,
    id: id,
  };
};
/// STOCK

/// UPDATE STOCK
export const updateStock = (stock) => {
  return {
    type: actionTypes.UPDATE_STOCK,
    stock: stock,
  };
};

export const resetStock = () => {
  return {
    type: actionTypes.RESET_STOCK,
  };
};
/// UPDATE STOCK

/// SAVE STOCK
export const saveStockSuccess = (stock) => {
  return {
    type: actionTypes.SAVE_STOCK_SUCCESS,
    stock: stock,
  };
};

export const saveStockFail = (error) => {
  return {
    type: actionTypes.SAVE_STOCK_FAIL,
    error: error,
  };
};

export const saveStockStart = () => {
  return {
    type: actionTypes.SAVE_STOCK_START,
  };
};

export const saveStock = (stock) => {
  return {
    type: actionTypes.SAVE_STOCK,
    stock: stock,
  };
};
/// SAVE STOCK

/// DELETE STOCK
export const deleteStockSuccess = (stock) => {
  return {
    type: actionTypes.DELETE_STOCK_SUCCESS,
  };
};

export const removeListStock = (stockCode) => {
  return {
    type: actionTypes.REMOVE_LIST_STOCK,
    stockCode: stockCode
  }
}

export const deleteStockFail = (error) => {
  return {
    type: actionTypes.DELETE_STOCK_FAIL,
    error: error,
  };
};

export const deleteStockStart = () => {
  return {
    type: actionTypes.DELETE_STOCK_START,
  };
};

export const deleteStock = (stock) => {
  return {
    type: actionTypes.DELETE_STOCK,
    stock: stock,
  };
};
/// DELETE STOCK

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (stock) => {
  return {
    type: actionTypes.FETCH_STOCK_AUDIT_LOGS,
    stock: stock,
  };
};
/// VIEW AUDIT LOGS

/// INDUSTRYS
export const fetchIndustrys = () => {
  return {
    type: actionTypes.FETCH_INDUSTRYS,
  };
};

export const fetchIndustrysSuccess = (industrys) => {
  return {
    type: actionTypes.FETCH_INDUSTRYS_SUCCESS,
    industrys: industrys,
  }
}
/// INDUSTRYS