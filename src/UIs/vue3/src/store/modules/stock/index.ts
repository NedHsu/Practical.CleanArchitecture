
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { StockState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_STOCKS_START](state: StockState) {
            state.loading = true;
        },
        [TYPES.FETCH_STOCKS_SUCCESS](state: StockState, data: any) {
            state.stocks = data;
            state.loading = false;
        },
        [TYPES.FETCH_STOCKS_FAIL](state: StockState) {
            state.loading = false;
        },
        [TYPES.ADD_STOCK_SUCCESS](state: StockState, data: any) {
            state.stocks.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_STOCK_SUCCESS](state: StockState, data: any) {
            
            state.loading = false;
        },
        [TYPES.DEL_STOCK_SUCCESS](state: StockState, id: string) {
            state.stocks = state.stocks.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_STOCKS]({ commit }) {
            commit(TYPES.FETCH_STOCKS_START);
            request.get("stocks")
                .then((rs) => {
                    commit(TYPES.FETCH_STOCKS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_STOCKS_FAIL, error);
                });
        },
        [ACTIONS.ADD_STOCK]({ commit }, stock) {
            commit(TYPES.FETCH_STOCKS_START);
            request.post("stocks", stock)
                .then(rs => {
                    commit(TYPES.ADD_STOCK_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_STOCKS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_STOCK]({ commit }, stock) {
            commit(TYPES.FETCH_STOCKS_START);
            request.put("stocks", stock)
                .then(rs => {
                    commit(TYPES.UPDATE_STOCK_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_STOCKS_FAIL, error);
                });
        },
        [ACTIONS.DEL_STOCK]({ commit }, id) {
            commit(TYPES.FETCH_STOCKS_START);
            request.delete("stocks/" + id)
                .then(rs => {
                    commit(TYPES.DEL_STOCK_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_STOCKS_FAIL, error);
                });
        },
    },
    getters: {
        stocks: (state) => state.stocks,
    },
} as Module<StockState, any>;


