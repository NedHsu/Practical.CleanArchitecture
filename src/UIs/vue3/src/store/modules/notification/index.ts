
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { NotificationState } from './types';
import { HubConnectionBuilder } from "@microsoft/signalr";
import authService from '../../../auth/authService';
import env from '../../../environments';
import dayjs from 'dayjs';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_NOTIFICATIONS_START](state: NotificationState) {
            state.loading = true;
        },
        [TYPES.FETCH_NOTIFICATIONS_SUCCESS](state: NotificationState, data: any) {
            state.notifications = data;
            state.loading = false;
        },
        [TYPES.FETCH_NOTIFICATIONS_FAIL](state: NotificationState) {
            state.loading = false;
        },
        [TYPES.CONNECT_NOTIFICATION_SUCCESS]() {
            console.log("CONNECT_NOTIFICATION_SUCCESS");
        },
        [TYPES.NOTIFICATION_RECEIVED](connection: HubConnectionBuilder) {
            
        },
    },
    actions: {
        async [ACTIONS.FETCH_NOTIFICATIONS]({ commit }) {
            commit(TYPES.FETCH_NOTIFICATIONS_START);
            await request.get("notifications")
                .then((rs) => {
                    commit(TYPES.FETCH_NOTIFICATIONS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_NOTIFICATIONS_FAIL, error);
                });
        },
        async [ACTIONS.CONNECT_NOTIFICATION_HUB]({ commit }) {
            const connection = new HubConnectionBuilder()
                .withUrl(env.ResourceServer.NotificationHub, {
                    accessTokenFactory: authService.getAccessToken
                })
                .withAutomaticReconnect()
                .build();
            connection.on("notificationReceived", (username: string, notification: string) => {
                console.log("notificationReceived");
                commit(TYPES.NOTIFICATION_RECEIVED, {
                    username,
                    notification,
                    time: dayjs().format("YYYY-MM-DD HH:mm"),
                });
            });

            connection.start()
                .catch(err => console.log(err))
                .then(() => {
                    commit(TYPES.CONNECT_NOTIFICATION_SUCCESS, connection);
                });
        }
    },
    getters: {
        notifications: (state) => state.notifications,
    },
} as Module<NotificationState, any>;


