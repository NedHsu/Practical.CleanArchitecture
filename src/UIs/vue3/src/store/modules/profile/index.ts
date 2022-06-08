
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { ProfileState, Profile } from './types';

export default {
    namespaced: true,
    state: () => ({
        profile: {},
        profiles: [] as Profile[],
    } as ProfileState),
    mutations: {
        [TYPES.FETCH_PROFILES_START](state: ProfileState) {
            state.loading = true;
        },
        [TYPES.FETCH_PROFILES_SUCCESS](state: ProfileState, data: any) {
            state.profiles = data;
            state.loading = false;
        },
        [TYPES.FETCH_PROFILES_FAIL](state: ProfileState) {
            state.loading = false;
        },
        [TYPES.ADD_PROFILE_SUCCESS](state: ProfileState, data: any) {
            state.profiles.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_PROFILE_SUCCESS](state: ProfileState, data: any) {
            
            state.loading = false;
        },
        [TYPES.DEL_PROFILE_SUCCESS](state: ProfileState, id: string) {
            state.profiles = state.profiles.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_PROFILES]({ commit }) {
            commit(TYPES.FETCH_PROFILES_START);
            request.get("profiles")
                .then((rs) => {
                    commit(TYPES.FETCH_PROFILES_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PROFILES_FAIL, error);
                });
        },
        [ACTIONS.ADD_PROFILE]({ commit }, profile) {
            commit(TYPES.FETCH_PROFILES_START);
            request.post("profiles", profile)
                .then(rs => {
                    commit(TYPES.ADD_PROFILE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PROFILES_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_PROFILE]({ commit }, profile) {
            commit(TYPES.FETCH_PROFILES_START);
            request.put("profiles", profile)
                .then(rs => {
                    commit(TYPES.UPDATE_PROFILE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PROFILES_FAIL, error);
                });
        },
        [ACTIONS.DEL_PROFILE]({ commit }, id) {
            commit(TYPES.FETCH_PROFILES_START);
            request.delete("profiles/" + id)
                .then(rs => {
                    commit(TYPES.DEL_PROFILE_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PROFILES_FAIL, error);
                });
        },
    },
    getters: {
        profiles: (state) => state.profiles,
    },
} as Module<ProfileState, any>;


