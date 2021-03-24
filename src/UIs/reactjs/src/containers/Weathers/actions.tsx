import * as actionTypes from "./actionTypes";

/// WEATHERS
export const fetchWeathersSuccess = (weathers) => {
  return {
    type: actionTypes.FETCH_WEATHERS_SUCCESS,
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
export const updateWeather = (weather) => {
  return {
    type: actionTypes.UPDATE_WEATHER,
    weather: weather,
  };
};

export const resetWeather = () => {
  return {
    type: actionTypes.RESET_WEATHER,
  };
};
/// UPDATE WEATHER

/// SAVE WEATHER
export const saveWeatherSuccess = (weather) => {
  return {
    type: actionTypes.SAVE_WEATHER_SUCCESS,
    weather: weather,
  };
};

export const saveWeatherFail = (error) => {
  return {
    type: actionTypes.SAVE_WEATHER_FAIL,
    error: error,
  };
};

export const saveWeatherStart = () => {
  return {
    type: actionTypes.SAVE_WEATHER_START,
  };
};

export const saveWeather = (weather) => {
  return {
    type: actionTypes.SAVE_WEATHER,
    weather: weather,
  };
};
/// SAVE WEATHER

/// DELETE WEATHER
export const deleteWeatherSuccess = (weather) => {
  return {
    type: actionTypes.DELETE_WEATHER_SUCCESS,
  };
};

export const deleteWeatherFail = (error) => {
  return {
    type: actionTypes.DELETE_WEATHER_FAIL,
    error: error,
  };
};

export const deleteWeatherStart = () => {
  return {
    type: actionTypes.DELETE_WEATHER_START,
  };
};

export const deleteWeather = (weather) => {
  return {
    type: actionTypes.DELETE_WEATHER,
    weather: weather,
  };
};
/// DELETE WEATHER

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_WEATHER_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_WEATHER_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_WEATHER_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (weather) => {
  return {
    type: actionTypes.FETCH_WEATHER_AUDIT_LOGS,
    weather: weather,
  };
};
/// VIEW AUDIT LOGS
