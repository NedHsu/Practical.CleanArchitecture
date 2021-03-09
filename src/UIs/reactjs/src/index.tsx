import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

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
