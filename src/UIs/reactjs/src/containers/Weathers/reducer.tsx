import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  weathers: [],
  weather: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
};

/// Weathers
const fetchWeathersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchWeathersSuccess = (state, action) => {
  return updateObject(state, {
    weathers: action.weathers,
    loading: false,
  });
};

const fetchWeathersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Weathers

/// Weather
const fetchWeatherStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchWeatherSuccess = (state, action) => {
  return updateObject(state, {
    weather: action.weather,
    loading: false,
  });
};

const fetchWeatherFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Weather

const saveWeatherStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveWeatherSuccess = (state, action) => {
  return updateObject(state, {
    weather: action.weather,
    loading: false,
    saved: true,
  });
};

const saveWeatherFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHERS_START:
      return fetchWeathersStart(state, action);
    case actionTypes.FETCH_WEATHERS_SUCCESS:
      return fetchWeathersSuccess(state, action);
    case actionTypes.FETCH_WEATHERS_FAIL:
      return fetchWeathersFail(state, action);
    case actionTypes.FETCH_WEATHER_START:
      return fetchWeatherStart(state, action);
    case actionTypes.FETCH_WEATHER_SUCCESS:
      return fetchWeatherSuccess(state, action);
    case actionTypes.FETCH_WEATHER_FAIL:
      return fetchWeatherFail(state, action);
    case actionTypes.UPDATE_WEATHER:
      return updateObject(state, { weather: action.weather });
    case actionTypes.RESET_WEATHER:
      return updateObject(state, initialState);
    case actionTypes.SAVE_WEATHER_START:
      return saveWeatherStart(state, action);
    case actionTypes.SAVE_WEATHER_SUCCESS:
      return saveWeatherSuccess(state, action);
    case actionTypes.SAVE_WEATHER_FAIL:
      return saveWeatherFail(state, action);
    case actionTypes.DELETE_WEATHER_START:
      return updateObject(state, {
        weather: action.weather,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_WEATHER_SUCCESS:
      return updateObject(state, {
        weather: initialState.weather,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_WEATHER_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_WEATHER_AUDIT_LOGS_START:
      return updateObject(state, {
        weather: action.weather,
        loading: true,
      });
    case actionTypes.FETCH_WEATHER_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_WEATHER_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
