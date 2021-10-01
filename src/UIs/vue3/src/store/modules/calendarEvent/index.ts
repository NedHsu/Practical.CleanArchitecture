
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
        [TYPES.ADD_CALENDAR_EVENT_SUCCESS](state: CalendarEventState, data: any) {
            state.calendarEvents = [...state.calendarEvents, data];
            state.opened = 0;
            state.loading = false;
        },
        [TYPES.UPDATE_CALENDAR_EVENT_SUCCESS](state: CalendarEventState, data: any) {
            let oldEventIndex = state.calendarEvents.findIndex(x => x.id == data.id);
            let oldEvent = state.calendarEvents[oldEventIndex];
            state.calendarEvents.splice(oldEventIndex, 1)
            state.calendarEvents = [...state.calendarEvents, {
                ...oldEvent,
                ...data
            }];
            console.log(state.calendarEvents);
            state.opened = 0;
            state.loading = false;
        },
        [TYPES.DEL_CALENDAR_EVENTS_SUCCESS](state: CalendarEventState, id: string) {
            state.calendarEvents = state.calendarEvents.filter(x => x.id !== id);
            state.opened = 0;
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
        [TYPES.EDIT_CALENDAR_EVENT](state: CalendarEventState, calendarEvent: CalendarEvent) {
            if (calendarEvent) {
                state.calendarEvent = calendarEvent;
            }
            state.opened = 2;
        }
    },
    actions: {
        async [ACTIONS.FETCH_CALENDAR_EVENTS]({ commit, state }, query) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.get("calendarEvents", { params: query })
                .then((rs) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_CALENDAR_EVENTS_FAIL, error);
                });
            return state.calendarEvents;
        },
        async [ACTIONS.ADD_CALENDAR_EVENT]({ commit, state }, calendarEvent) {
            commit(TYPES.FETCH_CALENDAR_EVENTS_START);
            await request.post("calendarEvents", calendarEvent)
                .then((rs) => {
                    commit(TYPES.ADD_CALENDAR_EVENT_SUCCESS, rs.data);
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
                    commit(TYPES.DEL_CALENDAR_EVENTS_SUCCESS, id);
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


