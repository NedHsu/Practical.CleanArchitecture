
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { CalendarEventState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_CALENDAR_EVENTS_START](state: CalendarEventState) {
            state.loading = true;
        },
        [TYPES.FETCH_CALENDAR_EVENTS_SUCCESS](state: CalendarEventState, data: any) {
            state.calendarEvents = data;
            state.loading = false;
        },
        [TYPES.FETCH_CALENDAR_EVENTS_FAIL](state: CalendarEventState) {
            state.loading = false;
        },
    },
    actions: {
        async [ACTIONS.FETCH_CALENDAR_EVENTS]({ commit }) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.get("calendarEvents")
                .then((rs) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
        }
    },
    getters: {
        calendarEvents: (state) => state.calendarEvents,
    },
} as Module<CalendarEventState, any>;


