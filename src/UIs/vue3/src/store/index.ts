import Vuex from 'vuex'
import authService from './modules/authService';
import product from './modules/product';
//--import
import calendarEvent from './modules/calendarEvent';

export default new Vuex.Store({
  modules: {
    product: product,
    authService: authService,
    //--modules
    calendarEvent: calendarEvent,
  }
})
