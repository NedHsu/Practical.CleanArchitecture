import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";
console.log("reducer");

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
  observations: [],
  earthquakes: [],
  tidals: [],
  recents: [],
  alarms: [],
  countys: [],
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

const fetchWeatherTidalSuccess = (state, action) => {
  return updateObject(state, {
    tidals: action.weathers,
    loading: false,
  });
};

const fetchWeatherRecentSuccess = (state, action) => {
  return updateObject(state, {
    recents: action.weathers,
    loading: false,
  });
};

const fetchWeatherAlarmSuccess = (state, action) => {
  return updateObject(state, {
    alarms: action.weathers,
    loading: false,
  });
};

const fetchWeatherEarthquakeSuccess = (state, action) => {
  return updateObject(state, {
    earthquakes: action.weathers,
    loading: false,
  });
};

const fetchWeatherCountySuccess = (state, action) => {
  return updateObject(state, {
    countys: action.weathers,
    loading: false,
  });
};

const fetchWeatherObservationSuccess = (state, action) => {
  return updateObject(state, {
    observations: action.weathers,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHERS_START:
      return fetchWeathersStart(state, action);
    case actionTypes.FETCH_WEATHERS_SUCCESS:
      return fetchWeathersSuccess(state, action);
    case actionTypes.FETCH_WEATHER_ALARM_SUCCESS:
      return fetchWeatherAlarmSuccess(state, action);
    case actionTypes.FETCH_WEATHER_COUNTY_SUCCESS:
      return fetchWeatherCountySuccess(state, action);
    case actionTypes.FETCH_WEATHER_EARTHQUAKE_SUCCESS:
      return fetchWeatherEarthquakeSuccess(state, action);
    case actionTypes.FETCH_WEATHER_OBSERVATION_SUCCESS:
      return fetchWeatherObservationSuccess(state, action);
    case actionTypes.FETCH_WEATHER_RECENT_SUCCESS:
      return fetchWeatherRecentSuccess(state, action);
    case actionTypes.FETCH_WEATHER_TIDAL_SUCCESS:
      return fetchWeatherTidalSuccess(state, action);
    case actionTypes.FETCH_WEATHERS_FAIL:
      return fetchWeathersFail(state, action);
    case actionTypes.FETCH_WEATHER_START:
      return fetchWeatherStart(state, action);
    case actionTypes.FETCH_WEATHER_SUCCESS:
      return fetchWeatherSuccess(state, action);
    case actionTypes.FETCH_WEATHER_FAIL:
      return fetchWeatherFail(state, action);
    case actionTypes.RESET_WEATHER:
      return updateObject(state, initialState);
    default:
      return state;
  }
};

export default reducer;
