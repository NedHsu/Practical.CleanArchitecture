import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { CalendarState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_CALENDARS_START](state: CalendarState) {
            state.loading = true;
        },
        [TYPES.FETCH_CALENDARS_SUCCESS](state: CalendarState, data: any) {
            state.calendars = data;
            state.loading = false;
        },
        [TYPES.FETCH_CALENDARS_FAIL](state: CalendarState) {
            state.loading = false;
        },
        [TYPES.ADD_CALENDARS_SUCCESS](state: CalendarState, data: any) {
            state.calendars.push(data);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_CALENDARS]({ commit }) {
            commit(TYPES.FETCH_CALENDARS_START);
            request.get("calendars")
                .then((rs) => {
                    commit(TYPES.FETCH_CALENDARS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.ADD_CALENDARS]({ commit }) {
            request.post("calendars")
                .then(rs => {
                    commit(TYPES.ADD_CALENDARS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        }
    },
    getters: {
        calendars: (state) => state.calendars,
    },
} as Module<CalendarState, any>;


