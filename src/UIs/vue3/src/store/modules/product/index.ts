
import { Module } from 'vuex'
import request from '../../../utils/request';
import TYPES from './mutationTypes';
import { Product, ProductState } from './types';

export default {
    namespaced: true,
    state: () => ({
        product: {},
        products: [] as Product[],
    } as ProductState),
    mutations: {
        [TYPES.fetchProductsStart](state: ProductState) {
            state.loading = true;
        },
        [TYPES.fetchProductsSuccess](state: ProductState, data: any) {
            state.products = data;
            state.loading = false;
        },
        [TYPES.fetchProductsFail](state: ProductState) {
            state.loading = false;
        },
        [TYPES.fetchProductSuccess](state: ProductState, data: any) {
            state.product = data;
            state.loading = false;
        },
        [TYPES.delProductSuccess](state: ProductState, id: string) {
            state.products = state.products.filter(x => x.id !== id);
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
        },
        async fetchProduct({ commit }, id) {
            commit(TYPES.fetchProductsStart)
            await request.get("products/" + id)
                .then((rs) => {
                    commit(TYPES.fetchProductSuccess, rs.data)
                })
                .catch((error) => {
                    commit(TYPES.fetchProductsFail, error)
                });
        },
        async updateProduct({ commit }, vm) {
            commit(TYPES.fetchProductsStart)
            await request.put("products/" + vm.id, vm)
                .then((rs) => {
                    commit(TYPES.fetchProductSuccess, rs.data)
                })
                .catch((error) => {
                    commit(TYPES.fetchProductsFail, error)
                });
        },
        async addProduct({ commit }, vm) {
            commit(TYPES.fetchProductsStart)
            await request.post("products/", vm)
                .then((rs) => {
                    commit(TYPES.fetchProductSuccess, rs.data)
                })
                .catch((error) => {
                    commit(TYPES.fetchProductsFail, error)
                });
        },
        async deleteProduct({ commit }, id) {
            commit(TYPES.fetchProductsStart)
            await request.delete("products/" + id)
                .then(() => {
                    commit(TYPES.delProductSuccess, id)
                })
                .catch((error) => {
                    commit(TYPES.fetchProductsFail, error)
                });
        },
    },
} as Module<ProductState, any>


