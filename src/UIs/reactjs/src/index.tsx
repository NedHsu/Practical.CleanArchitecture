import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AuthService from "./containers/Auth/authService";
import authReducer from "./containers/Auth/reducer";
import auditLogReducer from "./containers/AuditLogs/reducer";
import { watchAuditLog } from "./containers/AuditLogs/sagas";
import fileReducer from "./containers/Files/reducer";
import { watchFile } from "./containers/Files/sagas";
import productReducer from "./containers/Products/reducer";
import { watchProduct } from "./containers/Products/sagas";
import userReducer from "./containers/Users/reducer";
import { watchUser } from "./containers/Users/sagas";
import matchReducer from "./containers/Matches/reducer";
import { watchMatch } from "./containers/Matches/sagas";
import stockReducer from "./containers/Stocks/reducer";
import { watchStock } from "./containers/Stocks/sagas";
import stockNoteReducer from "./containers/StockNotes/reducer";
import { watchStockNote } from "./containers/StockNotes/sagas";
import stockGroupReducer from "./containers/StockGroups/reducer";
import { watchStockGroup } from "./containers/StockGroups/sagas";
import stockGroupItemReducer from "./containers/StockGroupItems/reducer";
import { watchStockGroupItem } from "./containers/StockGroupItems/sagas";
import stockDayReducer from "./containers/StockDays/reducer";
import { watchStockDay } from "./containers/StockDays/sagas";
import locationReducer from "./containers/Locations/reducer";
import { watchLocation } from "./containers/Locations/sagas";
import weatherReducer from "./containers/Weathers/reducer";
import { watchWeather } from "./containers/Weathers/sagas";
import d3Reducer from "./containers/D3s/reducer";
import { watchD3 } from "./containers/D3s/sagas";
import pageEffectReducer from "./containers/PageEffects/reducer";
import { watchPageEffect } from "./containers/PageEffects/sagas";
import stockProfitReducer from "./containers/StockProfits/reducer";
import { watchStockProfit } from "./containers/StockProfits/sagas";
import stockRevenueReducer from "./containers/StockRevenues/reducer";
import { watchStockRevenue } from "./containers/StockRevenues/sagas";
import stockMarginReducer from "./containers/StockMargins/reducer";
import { watchStockMargin } from "./containers/StockMargins/sagas";
import stockSeminarReducer from "./containers/StockSeminars/reducer";
import { watchStockSeminar } from "./containers/StockSeminars/sagas";
import stockFunderReducer from "./containers/StockFunders/reducer";
import { watchStockFunder } from "./containers/StockFunders/sagas";
import chatReducer from "./containers/Chats/reducer";
import { watchChat } from "./containers/Chats/sagas";
import notificationReducer from "./containers/Notifications/reducer";
import { watchNotification } from "./containers/Notifications/sagas";
import calendarReducer from "./containers/Calendars/reducer";
import { watchCalendar } from "./containers/Calendars/sagas";
import jobReducer from "./containers/Jobs/reducer";
import { watchJob } from "./containers/Jobs/sagas";
import jobSrcReducer from "./containers/JobSrcs/reducer";
import { watchJobSrc } from "./containers/JobSrcs/sagas";
import stockEPSReducer from "./containers/StockEPS/reducer";
import { watchStockEPS } from "./containers/StockEPS/sagas";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
  product: productReducer,
  user: userReducer,
  auditLog: auditLogReducer,
  match: matchReducer,
  stock: stockReducer,
  stockNote: stockNoteReducer,
  stockGroup: stockGroupReducer,
  stockGroupItem: stockGroupItemReducer,
  stockDay: stockDayReducer,
  location: locationReducer,
  weather: weatherReducer,
  d3: d3Reducer,
  pageeffect: pageEffectReducer,
  stockProfit: stockProfitReducer,
  stockRevenue: stockRevenueReducer,
  stockMargin: stockMarginReducer,
  stockSeminar: stockSeminarReducer,
  stockFunder: stockFunderReducer,
  chat: chatReducer,
  notification: notificationReducer,
  calendar: calendarReducer,
  job: jobReducer,
  jobSrc: jobSrcReducer,
  stockEPS: stockEPSReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchFile);
sagaMiddleware.run(watchProduct);
sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchAuditLog);
sagaMiddleware.run(watchMatch);
sagaMiddleware.run(watchStock);
sagaMiddleware.run(watchStockNote);
sagaMiddleware.run(watchStockGroup);
sagaMiddleware.run(watchStockGroupItem);
sagaMiddleware.run(watchStockDay);
sagaMiddleware.run(watchLocation);
sagaMiddleware.run(watchWeather);
sagaMiddleware.run(watchD3);
sagaMiddleware.run(watchPageEffect);
sagaMiddleware.run(watchStockProfit);
sagaMiddleware.run(watchStockRevenue);
sagaMiddleware.run(watchStockMargin);
sagaMiddleware.run(watchStockSeminar);
sagaMiddleware.run(watchChat);
sagaMiddleware.run(watchNotification);
sagaMiddleware.run(watchCalendar);
sagaMiddleware.run(watchStockFunder);
sagaMiddleware.run(watchJob);
sagaMiddleware.run(watchJobSrc);
sagaMiddleware.run(watchStockEPS);

store.dispatch({
  type: "SET_AUTH_SERVICE",
  authService: AuthService,
});

AuthService.loadUser().then((user) => {
  if (AuthService.isAuthenticated()) {
    store.dispatch({
      type: "LOGIN",
      user: user,
    });
    store.dispatch({
      type: "CONNECT_NOTIFICATION",
    })
  }

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
