
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { Word, WordState, WordStats, WordStatsPaged } from './types';

export default {
    namespaced: true,
    state: () => ({
        word: {},
        wordCustom: {},
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
        loading: true,
        wordsLoading: true,
        correct: 0,
        wrong: 0,
        editting: false,
    } as WordState),
    mutations: {
        [TYPES.FETCH_WORD_START](state: WordState) {
            state.loading = true;
        },
        [TYPES.FETCH_WORDS_START](state: WordState) {
            state.wordsLoading = true;
        },
        [TYPES.FETCH_WORDS_SUCCESS](state: WordState, data: any) {
            state.words = data;
            state.wordsLoading = false;
        },
        [TYPES.FETCH_WORD_FAIL](state: WordState) {
            state.loading = false;
        },
        [TYPES.FETCH_WORDS_FAIL](state: WordState) {
            state.wordsLoading = false;
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
        [TYPES.UPDATE_WORD_CUSTOM_SUCCESS](state: WordState, data: any) {
            const word = state.wordStatsPaged.items[state.wordIndex];
            word.text = data.text;
            word.description = data.description;
            word.customId = data.id;
            state.loading = false;
            state.editting = false;
        },
        [TYPES.DEL_WORD_CUSTOM_SUCCESS](state: WordState, data: any) {
            const word = state.wordStatsPaged.items[state.wordIndex];
            word.text = data.text;
            word.description = data.description;
            word.customId = undefined;
            state.loading = false;
        },
        [TYPES.DEL_WORD_SUCCESS](state: WordState, id: string) {
            state.words = state.words.filter(x => x.id !== id);
            state.loading = false;
        },
        [TYPES.FETCH_WORD_STATS_PAGED_SUCCESS](state: WordState, data: any) {
            state.wordIndex = 0;
            state.wordStatsPaged.items = data.items;
            state.wordsLoading = false;
        },
        [TYPES.FETCH_WORD_STATS_RECENT_SUCCESS](state: WordState, data: any) {
            state.recentWords = data;
            state.loading = false;
        },
        [TYPES.UPDATE_WORD_STATS_SUCCESS](state: WordState, data: any) {
            state.loading = false;
        },
        [TYPES.PUT_WORD_RECENT](state: WordState, actions: { ok?: boolean, isFav?: boolean, }) {
            const item = state.wordStatsPaged.items[state.wordIndex];
            if (actions.ok !== undefined) {
                if (actions.ok) {
                    item.correct++;
                    state.correct++;
                } else {
                    item.wrong++;
                    state.wrong++;
                }
                state.wordIndex++;
                item.ok = actions.ok;
                state.recentWords = [...state.recentWords.slice(-19), item];
            }

            if (actions.isFav !== undefined) {
                item.isFav = actions.isFav;
            }
        },
        [TYPES.REVIEW_WORD_STATS](state: WordState) {
            state.wordStatsPaged.items = state.recentWords.map(x => {return { ...x, ok: undefined, } as WordStats; });
            state.recentWords = [];
            state.wordIndex = 0;
        },
        [TYPES.POP_WORD_STATS](state: WordState, word: WordStats) {
            state.recentWords = state.recentWords.filter(x => x !== word);
            state.wordStatsPaged.items = [word, ...state.wordStatsPaged.items.filter(x => x.ok == null)];
            word.ok = undefined;
            state.wordIndex = 0;
        },
        [TYPES.CLOSE_WORD_MODAL](state: WordState) {
            state.editting = false;
        },
        [TYPES.OPEN_WORD_MODAL](state: WordState) {
            const word = state.wordStatsPaged.items[state.wordIndex];
            state.wordCustom = {
                id: word.customId,
                wordId: word.wordId,
                text: word.text,
                description: word.description,
                partOfSpeach: word.partOfSpeach,
            };
            state.editting = true;
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
        [ACTIONS.UPDATE_WORD_STATS]({ commit, state }, actions) {
            const wordStats = state.wordStatsPaged.items[state.wordIndex];
            commit(TYPES.PUT_WORD_RECENT, actions);
            return request.put("words/stats", {
                wordId: wordStats.wordId,
                ...actions,
            })
                .then((rs) => {
                    commit(TYPES.UPDATE_WORD_STATS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
                });
        },
        [ACTIONS.ADD_WORD]({ commit }, word) {
            commit(TYPES.FETCH_WORDS_START);
            request.post("words", word)
                .then(rs => {
                    commit(TYPES.ADD_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_WORD]({ commit }, word) {
            commit(TYPES.FETCH_WORD_START);
            request.put("words", word)
                .then(rs => {
                    commit(TYPES.UPDATE_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
                });
        },
        [ACTIONS.DEL_WORD]({ commit }, id) {
            commit(TYPES.FETCH_WORDS_START);
            request.delete("words/" + id)
                .then(rs => {
                    commit(TYPES.DEL_WORD_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_WORD_CUSTOM]({ commit, state }) {
            commit(TYPES.FETCH_WORD_START);
            request.put("wordCustoms", state.wordCustom)
                .then(rs => {
                    commit(TYPES.UPDATE_WORD_CUSTOM_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
                });
        },
        [ACTIONS.DEL_WORD_CUSTOM]({ commit }, id) {
            commit(TYPES.FETCH_WORD_START);
            request.delete("wordCustoms/" + id)
                .then(rs => {
                    commit(TYPES.DEL_WORD_CUSTOM_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_WORD_FAIL, error);
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
        wordStatsItems: (state) => state.wordStatsPaged.items,
        wordStats: (state) => state.wordStatsPaged.items[state.wordIndex],
    },
} as Module<WordState, any>;
