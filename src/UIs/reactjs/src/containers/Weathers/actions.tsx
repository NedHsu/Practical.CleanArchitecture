import * as actionTypes from "./actionTypes";

/// WEATHERS
export const fetchWeathersSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHERS_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherAlarmSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_ALARM_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherCountySuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_COUNTY_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherEarthquakeSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_EARTHQUAKE_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherRecentSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_RECENT_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherTidalSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_TIDAL_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeatherObservationSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHER_OBSERVATION_SUCCESS,
    weathers: weathers,
  };
};

export const fetchWeathersFail = (error) => {
  return {
    type: actionTypes.FETCH_WEATHERS_FAIL,
    error: error,
  };
};

export const fetchWeathersStart = () => {
  return {
    type: actionTypes.FETCH_WEATHERS_START,
  };
};

export const fetchWeathers = () => {
  return {
    type: actionTypes.FETCH_WEATHERS,
  };
};

export const fetchWeatherAlarm = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_ALARM,
    query: query,
  };
};

export const fetchWeatherCounty = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_COUNTY,
    query: query,
  };
};

export const fetchWeatherEarthquake = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_EARTHQUAKE,
    query: query,
  };
};

export const fetchWeatherRecent = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_RECENT,
    query: query,
  };
};

export const fetchWeatherTidal = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_TIDAL,
    query: query,
  };
};
export const fetchWeatherObservation = (query) => {
  return {
    type: actionTypes.FETCH_WEATHER_OBSERVATION,
    query: query,
  };
};
/// WEATHERS

/// WEATHER
export const fetchWeatherSuccess = (weather) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    weather: weather,
  };
};

export const fetchWeatherFail = (error) => {
  return {
    type: actionTypes.FETCH_WEATHER_FAIL,
    error: error,
  };
};

export const fetchWeatherStart = () => {
  return {
    type: actionTypes.FETCH_WEATHER_START,
  };
};

export const fetchWeather = (id) => {
  return {
    type: actionTypes.FETCH_WEATHER,
    id: id,
  };
};
/// WEATHER

/// UPDATE WEATHER
export const resetWeather = () => {
  return {
    type: actionTypes.RESET_WEATHER,
  };
};
/// UPDATE WEATHER