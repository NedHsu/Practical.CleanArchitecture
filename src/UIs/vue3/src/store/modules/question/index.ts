
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { QuestionState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_QUESTIONS_START](state: QuestionState) {
            state.loading = true;
        },
        [TYPES.FETCH_QUESTIONS_SUCCESS](state: QuestionState, data: any) {
            state.questions = data;
            state.loading = false;
        },
        [TYPES.FETCH_QUESTIONS_FAIL](state: QuestionState) {
            state.loading = false;
        },
        [TYPES.ADD_QUESTION_SUCCESS](state: QuestionState, data: any) {
            state.questions.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_QUESTION_SUCCESS](state: QuestionState, data: any) {
            
            state.loading = false;
        },
        [TYPES.DEL_QUESTION_SUCCESS](state: QuestionState, id: string) {
            state.questions = state.questions.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_QUESTIONS]({ commit }) {
            commit(TYPES.FETCH_QUESTIONS_START);
            request.get("questions")
                .then((rs) => {
                    commit(TYPES.FETCH_QUESTIONS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_QUESTIONS_FAIL, error);
                });
        },
        [ACTIONS.ADD_QUESTION]({ commit }, question) {
            commit(TYPES.FETCH_QUESTIONS_START);
            request.post("questions", question)
                .then(rs => {
                    commit(TYPES.ADD_QUESTION_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_QUESTIONS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_QUESTION]({ commit }, question) {
            commit(TYPES.FETCH_QUESTIONS_START);
            request.put("questions", question)
                .then(rs => {
                    commit(TYPES.UPDATE_QUESTION_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_QUESTIONS_FAIL, error);
                });
        },
        [ACTIONS.DEL_QUESTION]({ commit }, id) {
            commit(TYPES.FETCH_QUESTIONS_START);
            request.delete("questions/" + id)
                .then(rs => {
                    commit(TYPES.DEL_QUESTION_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_QUESTIONS_FAIL, error);
                });
        },
    },
    getters: {
        questions: (state) => state.questions,
    },
} as Module<QuestionState, any>;


