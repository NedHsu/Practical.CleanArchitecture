import Vuex from 'vuex'
import authService from './modules/authService';
import product from './modules/product';

export default new Vuex.Store({
  modules: {
    product: product,
    authService: authService,
  }
})
