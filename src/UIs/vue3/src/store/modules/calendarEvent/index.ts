
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { CalendarEvent, CalendarEventState } from './types';

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
        [TYPES.ADD_CALENDAR_EVENTS_SUCCESS](state: CalendarEventState, data: any) {
            state.calendarEvent = data;
            state.loading = false;
        },
        [TYPES.UPDATE_CALENDAR_EVENT_SUCCESS](state: CalendarEventState, data: any) {
            state.calendarEvent = data;
            state.loading = false;
        },
        [TYPES.DEL_CALENDAR_EVENTS_SUCCESS](state: CalendarEventState, id: string) {
            state.calendarEvents = state.calendarEvents.filter(x => x.id === id);
            state.loading = false;
        },
        [TYPES.OPEN_CALENDAR_EVENT](state: CalendarEventState, calendarEvent: CalendarEvent) {
            state.calendarEvent = calendarEvent;
            state.opened = 1;
        },
        [TYPES.CLOSE_CALENDAR_EVENT](state: CalendarEventState) {
            state.calendarEvent = {} as CalendarEvent;
            state.opened = 0;
        },
        [TYPES.EDIT_CALENDAR_EVENT](state: CalendarEventState) {
            state.opened = 2;
        }
    },
    actions: {
        async [ACTIONS.FETCH_CALENDAR_EVENTS]({ commit, state }) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.get("calendarEvents")
                .then((rs) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
            return state.calendarEvents;
        },
        async [ACTIONS.ADD_CALENDAR_EVENTS]({ commit, state }, calendarEvent) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.post("calendarEvents", calendarEvent)
                .then((rs) => {
                    commit(TYPES.ADD_CALENDAR_EVENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
            return state.calendarEvent;
        },
        async [ACTIONS.UPDATE_CALENDAR_EVENT]({ commit, state }, calendarEvent) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.put("calendarEvents/" + calendarEvent.id, calendarEvent)
                .then((rs) => {
                    commit(TYPES.UPDATE_CALENDAR_EVENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
            return state.calendarEvent;
        },
        [ACTIONS.DEL_CALENDAR_EVENT]({ commit }, id) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            return request.delete("calendarEvents/" + id)
                .then((rs) => {
                    commit(TYPES.DEL_CALENDAR_EVENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
        }
    },
    getters: {
        calendarEvents: (state) => state.calendarEvents,
        detailOpened: (state) => state.opened == 1,
        editorOpened: (state) => state.opened == 2,
    },
} as Module<CalendarEventState, any>;


