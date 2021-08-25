
import { Module } from 'vuex'
import { AuthServiceState } from './types';

export default {
    state: {} as AuthServiceState,
    mutations: {
        setAuthService(state, authService) {
            state.authService = authService;
        },
        setUser(state, user) {
            state.user = user;
            console.log(user);
        },
    },
    actions: {
        TRY_AUTO_LOGIN({ commit }, authService) {
            commit('setAuthService', authService)
        },
        LOGIN({ commit }, user) {
            commit('setUser', user)
        },
        LOGOUT({ }) {
            this.state.authService.authService.logout();
        }
    },
    getters: {
        
    }
} as Module<AuthServiceState, any>


