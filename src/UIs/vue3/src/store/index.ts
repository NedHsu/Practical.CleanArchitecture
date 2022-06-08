import Vuex from 'vuex'
import authService from './modules/authService';
import product from './modules/product';
//--import
import profile from './modules/profile';
import payment from './modules/payment';
import word from './modules/word';
import question from './modules/question';
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
    profile: profile,
    payment: payment,
    word: word,
    question: question,
    stock: stock,
    awesomePage: awesomePage,
    calendar: calendar,
    notification: notification,
    calendarEvent: calendarEvent,
  }
})
