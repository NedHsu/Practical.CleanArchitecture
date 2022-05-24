
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { Word, WordState, WordStats, WordStatsPaged } from './types';

export default {
    namespaced: true,
    state: () => ({
        word: {},
        words: [] as Word[],
        wordIndex: 0,
        wordStatsPaged: {
            items: [],
            total: 0,
            pageIndex: 0,
            totalCount: 0,
            totalPages: 0,
        } as WordStatsPaged,
        recentWords: [] as WordStats[],
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
        [TYPES.FETCH_WORD_STATS_PAGED_SUCCESS](state: WordState, data: any) {
            state.wordStatsPaged = data;
            state.wordIndex = 0;
            state.loading = false;
        },
        [TYPES.FETCH_WORD_STATS_RECENT_SUCCESS](state: WordState, data: any) {
            state.recentWords = data;
            state.loading = false;
        },
        [TYPES.UPDATE_WORD_STATS_SUCCESS](state: WordState, data: any) {
            state.loading = false;
        },
        [TYPES.PUT_WORD_RECENT](state: WordState, data: any) {
            state.recentWords.push(data);
            state.wordIndex++;
        },
        [TYPES.REVIEW_WORD_STATS](state: WordState) {
            console.log('review');
            state.wordIndex = 0;
            state.wordStatsPaged.items = state.recentWords;
            state.recentWords = [];
        }
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
        [ACTIONS.FETCH_WORD_STATS_PAGED]({ commit }, quey) {
            commit(TYPES.FETCH_WORDS_START);
            return request.get("words/stats/paged", { params: quey })
                .then((rs) => {
                    commit(TYPES.FETCH_WORD_STATS_PAGED_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.FETCH_WORD_STATS_RECENT]({ commit }, quey) {
            commit(TYPES.FETCH_WORDS_START);
            return request.get("words/stats/recent", { params: quey })
                .then((rs) => {
                    commit(TYPES.FETCH_WORD_STATS_RECENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORDS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_WORD_STATS]({ commit, state }, ok) {
            let wordStats = {
                ...state.wordStatsPaged.items[state.wordIndex],
            }
            if (ok) {
                wordStats.correct++;
            } else {
                wordStats.wrong++;
            }
            commit(TYPES.PUT_WORD_RECENT, wordStats);
            return request.put("words/stats", {
                OK: ok,
                wordId: wordStats.wordId,
            })
                .then((rs) => {
                    commit(TYPES.UPDATE_WORD_STATS_SUCCESS, rs.data);
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
