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
        [TYPES.FETCH_CALENDAR_SUCCESS](state: CalendarState, data: any) {
            state.calendar = data;
            state.loading = false;
        },
        [TYPES.FETCH_CALENDARS_SUCCESS](state: CalendarState, data: any) {
            state.calendars = data;
            state.loading = false;
        },
        [TYPES.FETCH_CALENDARS_FAIL](state: CalendarState) {
            state.loading = false;
        },
        [TYPES.ADD_CALENDAR_SUCCESS](state: CalendarState, data: any) {
            state.loading = false;
        },
        [TYPES.UPDATE_CALENDAR_SUCCESS](state: CalendarState, data: any) {
            state.loading = false;
        },
        [TYPES.DEL_CALENDAR_SUCCESS](state: CalendarState, id: string) {
            state.calendars = state.calendars.filter(x => x.id !== id);
            state.loading = false;
        },
        [TYPES.FETCH_CALENDAR_CATEGORYS_SUCCESS](state: CalendarState, data: any) {
            state.calendarCategories = data;
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_CALENDARS]({ commit }) {
            commit(TYPES.FETCH_CALENDARS_START);
            request.get("calendars")
                .then((rs) => {
                    console.log(rs.data);
                    commit(TYPES.FETCH_CALENDARS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.ADD_CALENDAR]({ commit }, calendar) {
            request.post("calendars", calendar)
                .then(rs => {
                    commit(TYPES.ADD_CALENDAR_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_CALENDAR]({ commit }, calendar) {
            request.put("calendars", calendar)
                .then(rs => {
                    commit(TYPES.UPDATE_CALENDAR_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.FETCH_CALENDARCATEGORIES]({ commit }) {
            request.get("calendarCategories")
                .then(rs => {
                    commit(TYPES.FETCH_CALENDAR_CATEGORYS_SUCCESS, rs.data);
                })
                .catch(error => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.FETCH_CALENDAR]({ commit }, id) {
            request.get("calendars/" + id)
                .then(rs => {
                    commit(TYPES.FETCH_CALENDAR_SUCCESS, rs.data);
                })
                .catch(error => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        },
        [ACTIONS.DEL_CALENDAR]({ commit }, id) {
            request.delete("calendars/" + id)
                .then(rs => {
                    commit(TYPES.DEL_CALENDAR_SUCCESS, rs.data);
                })
                .catch(error => {
                    commit(TYPES.FETCH_CALENDARS_FAIL, error);
                });
        }
    },
    getters: {
        calendars: (state) => state.calendars,
    },
} as Module<CalendarState, any>;


