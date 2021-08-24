
import { Module } from 'vuex'
import { AuthService as AuthServiceState } from './types';

export default {
    state: {} as AuthServiceState,
    mutations: {
        setAuthService(state, authService) {
            state.authService = authService;
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        tryAutoLogin({ commit }, authService) {
            commit('setAuthService', authService)
        },
        LOGIN({ commit }, user) {
            commit('setUser', user)
        }
    },
} as Module<AuthServiceState, any>


