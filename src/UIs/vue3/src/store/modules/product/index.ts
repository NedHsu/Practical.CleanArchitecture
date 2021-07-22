
import { Module } from 'vuex'
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import { ProductState } from './types';

export default {
    namespaced: true,
    mutations: {
        [TYPES.fetchProductsStart] (state: ProductState) {
            state.loading = true;
        },
        [TYPES.fetchProductsSuccess] (state: ProductState, data: any) {
            state.products = data;
            state.loading = false;
        },
        [TYPES.fetchProductsFail] (state: ProductState) {
            state.loading = false;
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            commit(TYPES.fetchProductsStart)
            await request.get("products")
                .then((rs) => {
                    commit(TYPES.fetchProductsSuccess, rs.data)
                })
                .catch((error) => {
                    commit(TYPES.fetchProductsFail, error)
                })
        }
    },
    getters: {
        products: (state) => state.products,
    },
} as Module<ProductState, any>


