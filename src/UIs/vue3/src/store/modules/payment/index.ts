
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { PaymentState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.FETCH_PAYMENTS_START](state: PaymentState) {
            state.loading = true;
        },
        [TYPES.FETCH_PAYMENTS_SUCCESS](state: PaymentState, data: any) {
            state.payments = data;
            state.loading = false;
        },
        [TYPES.FETCH_PAYMENTS_FAIL](state: PaymentState) {
            state.loading = false;
        },
        [TYPES.ADD_PAYMENT_SUCCESS](state: PaymentState, data: any) {
            state.payments.push(data);
            state.loading = false;
        },
        [TYPES.UPDATE_PAYMENT_SUCCESS](state: PaymentState, data: any) {
            state.loading = false;
        },
        [TYPES.DEL_PAYMENT_SUCCESS](state: PaymentState, id: string) {
            state.payments = state.payments.filter(x => x.id !== id);
            state.loading = false;
        },
    },
    actions: {
        [ACTIONS.FETCH_PAYMENTS]({ commit }) {
            commit(TYPES.FETCH_PAYMENTS_START);
            request.get("payments")
                .then((rs) => {
                    commit(TYPES.FETCH_PAYMENTS_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PAYMENTS_FAIL, error);
                });
        },
        [ACTIONS.ADD_PAYMENT]({ commit }, payment) {
            commit(TYPES.FETCH_PAYMENTS_START);
            request.post("payments", payment)
                .then(rs => {
                    commit(TYPES.ADD_PAYMENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PAYMENTS_FAIL, error);
                });
        },
        [ACTIONS.UPDATE_PAYMENT]({ commit }, payment) {
            commit(TYPES.FETCH_PAYMENTS_START);
            request.put("payments", payment)
                .then(rs => {
                    commit(TYPES.UPDATE_PAYMENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PAYMENTS_FAIL, error);
                });
        },
        [ACTIONS.DEL_PAYMENT]({ commit }, id) {
            commit(TYPES.FETCH_PAYMENTS_START);
            request.delete("payments/" + id)
                .then(rs => {
                    commit(TYPES.DEL_PAYMENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PAYMENTS_FAIL, error);
                });
        },
    },
    getters: {
        payments: (state) => state.payments,
    },
} as Module<PaymentState, any>;


