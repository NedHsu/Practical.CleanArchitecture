
import { Module } from 'vuex';
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import ACTIONS from './actionTypes';
import { Payment, PaymentState } from './types';
import dayjs from 'dayjs';

export default {
    namespaced: true,
    state: () => ({
        payments: [],
        payment: {} as Payment,
        loading: false,
        saved: false,
        deleted: false,
        error: null,
        checkoutKeys: ['MerchantID', 'MerchantTradeNo', 'MerchantTradeDate', 'PaymentType', 'TotalAmount', 'TradeDesc', 'ItemName', 'ReturnURL', 'ChoosePayment', 'CheckMacValue', 'EncryptType'],
    } as PaymentState),
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
        [TYPES.FETCH_PAYMENT_SUCCESS](state: PaymentState, data: any) {
            state.payment = data;
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
        async [ACTIONS.FETCH_PAYMENT]({ commit }) {
            commit(TYPES.FETCH_PAYMENTS_START);
            return await request.post("payments", {
                "tradeDesc": dayjs().format('YYYYMMDDHHmmss'),
                "merchantTradeNo": dayjs().format('YYYYMMDDHHmmss'),
                "totalAmount": 1000,
                "platformID": "platformID",
                "items": [
                    {
                        "name": "name",
                        "price": 1000,
                        "url": "url",
                        "quantity": 1
                    }
                ],
                "merchantTradeDate": dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
            })
                .then((rs) => {
                    commit(TYPES.FETCH_PAYMENT_SUCCESS, rs.data);
                })
                .catch((error) => {
                    commit(TYPES.FETCH_PAYMENTS_FAIL, error);
                }).finally(() => {
                    console.log('finally');
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


