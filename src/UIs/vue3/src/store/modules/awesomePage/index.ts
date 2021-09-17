
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { AwesomePageState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_AWESOME_PAGES_START](state: AwesomePageState) {
            state.loading = true;
        },
        [TYPES.FETCH_AWESOME_PAGES_SUCCESS](state: AwesomePageState, data: any) {
            state.awesomePages = data;
            state.loading = false;
        },
        [TYPES.FETCH_AWESOME_PAGES_FAIL](state: AwesomePageState) {
            state.loading = false;
        },
        [TYPES.ADD_AWESOME_PAGE_SUCCESS](state: AwesomePageState, data: any) {
            state.awesomePages.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_AWESOME_PAGE_SUCCESS](state: AwesomePageState, data: any) {
            
            state.loading = false;
        },
        [TYPES.DEL_AWESOME_PAGE_SUCCESS](state: AwesomePageState, id: string) {
            state.awesomePages = state.awesomePages.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_AWESOME_PAGES]({ commit }) {
            commit(TYPES.FETCH_AWESOME_PAGES_START);
            request.get("awesomePages")
                .then((rs) => {
                    commit(TYPES.FETCH_AWESOME_PAGES_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_AWESOME_PAGES_FAIL, error);
                });
        },
        [ACTIONS.ADD_AWESOME_PAGE]({ commit }, awesomePage) {
            commit(TYPES.FETCH_AWESOME_PAGES_START);
            request.post("awesomePages", awesomePage)
                .then(rs => {
                    commit(TYPES.ADD_AWESOME_PAGE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_AWESOME_PAGES_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_AWESOME_PAGE]({ commit }, awesomePage) {
            commit(TYPES.FETCH_AWESOME_PAGES_START);
            request.put("awesomePages", awesomePage)
                .then(rs => {
                    commit(TYPES.UPDATE_AWESOME_PAGE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_AWESOME_PAGES_FAIL, error);
                });
        },
        [ACTIONS.DEL_AWESOME_PAGE]({ commit }, id) {
            commit(TYPES.FETCH_AWESOME_PAGES_START);
            request.delete("awesomePages/" + id)
                .then(rs => {
                    commit(TYPES.DEL_AWESOME_PAGE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_AWESOME_PAGES_FAIL, error);
                });
        },
    },
    getters: {
        awesomePages: (state) => state.awesomePages,
    },
} as Module<AwesomePageState, any>;


