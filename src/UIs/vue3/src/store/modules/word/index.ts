
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { Word, WordState } from './types';

export default {
    namespaced: true,
    state: () => ({
        word: {},
        words: [] as Word[],
    } as WordState),
    mutations: {
        [TYPES.FETCH_WORDS_START](state: WordState) {
            state.loading = true;
        },
        [TYPES.FETCH_WORDS_SUCCESS](state: WordState, data: any) {
            state.words = data;
            state.loading = false;
        },
        [TYPES.FETCH_WORDS_FAIL](state: WordState) {
            state.loading = false;
        },
        [TYPES.ADD_WORD_SUCCESS](state: WordState, data: any) {
            state.words.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_WORDS_SUCCESS](state: WordState, data: any) {
            state.words = data;
            state.loading = false;
        },
        [TYPES.UPDATE_WORD_SUCCESS](state: WordState, data: any) {

            state.loading = false;
        },
        [TYPES.DEL_WORD_SUCCESS](state: WordState, id: string) {
            state.words = state.words.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_WORDS]({ commit }) {
            commit(TYPES.FETCH_WORDS_START);
            request.get("words")
                .then((rs) => {
                    commit(TYPES.FETCH_WORDS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.ADD_WORD]({ commit }, word) {
            commit(TYPES.FETCH_WORDS_START);
            request.post("words", word)
                .then(rs => {
                    commit(TYPES.ADD_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_WORD]({ commit }, word) {
            commit(TYPES.FETCH_WORDS_START);
            request.put("words", word)
                .then(rs => {
                    commit(TYPES.UPDATE_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.DEL_WORD]({ commit }, id) {
            commit(TYPES.FETCH_WORDS_START);
            request.delete("words/" + id)
                .then(rs => {
                    commit(TYPES.DEL_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_WORDS]({ commit }, words) {
            commit(TYPES.FETCH_WORDS_START);
            request.put("words", words)
                .then(rs => {
                    commit(TYPES.UPDATE_WORDS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
    },
    getters: {
        words: (state) => state.words,
    },
} as Module<WordState, any>;
