import Vuex from 'vuex'
import authService from './modules/authService';
import product from './modules/product';
//--import
import stock from './modules/stock';
import awesomePage from './modules/awesomePage';
import calendar from './modules/calendar';
import notification from './modules/notification';
import calendarEvent from './modules/calendarEvent';

export default new Vuex.Store({
  modules: {
    product: product,
    authService: authService,
    //--modules
    stock: stock,
    awesomePage: awesomePage,
    calendar: calendar,
    notification: notification,
    calendarEvent: calendarEvent,
  }
})
