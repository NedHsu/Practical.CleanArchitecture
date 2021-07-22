
import { Module } from 'vuex'
import { AuthService as AuthServiceState } from './types';

export default {
    state: {} as AuthServiceState,
    mutations: {
        setAuthService(state, authService) {
            state.authService = authService;
          }
    },
    actions: {
        tryAutoLogin({ commit }, authService) {
            commit('setAuthService', authService)
          }
    },
} as Module<AuthServiceState, any>


