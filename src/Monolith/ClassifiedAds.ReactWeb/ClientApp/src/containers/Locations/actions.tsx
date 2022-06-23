import * as actionTypes from "./actionTypes";

/// LOCATIONS
export const fetchLocationsSuccess = (locations) => {
  return {
    type: actionTypes.FETCH_LOCATIONS_SUCCESS,
    locations: locations,
  };
};

export const fetchLocationsFail = (error) => {
  return {
    type: actionTypes.FETCH_LOCATIONS_FAIL,
    error: error,
  };
};

export const fetchLocationsStart = () => {
  return {
    type: actionTypes.FETCH_LOCATIONS_START,
  };
};

export const fetchLocations = () => {
  return {
    type: actionTypes.FETCH_LOCATIONS,
  };
};
/// LOCATIONS

/// LOCATION
export const fetchLocationSuccess = (location) => {
  return {
    type: actionTypes.FETCH_LOCATION_SUCCESS,
    location: location,
  };
};

export const fetchLocationFail = (error) => {
  return {
    type: actionTypes.FETCH_LOCATION_FAIL,
    error: error,
  };
};

export const fetchLocationStart = () => {
  return {
    type: actionTypes.FETCH_LOCATION_START,
  };
};

export const fetchLocation = (id) => {
  return {
    type: actionTypes.FETCH_LOCATION,
    id: id,
  };
};
/// LOCATION

/// UPDATE LOCATION
export const updateLocation = (location) => {
  return {
    type: actionTypes.UPDATE_LOCATION,
    location: location,
  };
};

export const resetLocation = () => {
  return {
    type: actionTypes.RESET_LOCATION,
  };
};
/// UPDATE LOCATION

/// SAVE LOCATION
export const saveLocationSuccess = (location) => {
  return {
    type: actionTypes.SAVE_LOCATION_SUCCESS,
    location: location,
  };
};

export const saveLocationFail = (error) => {
  return {
    type: actionTypes.SAVE_LOCATION_FAIL,
    error: error,
  };
};

export const saveLocationStart = () => {
  return {
    type: actionTypes.SAVE_LOCATION_START,
  };
};

export const saveLocation = (location) => {
  return {
    type: actionTypes.SAVE_LOCATION,
    location: location,
  };
};
/// SAVE LOCATION

/// DELETE LOCATION
export const deleteLocationSuccess = (location) => {
  return {
    type: actionTypes.DELETE_LOCATION_SUCCESS,
  };
};

export const deleteLocationFail = (error) => {
  return {
    type: actionTypes.DELETE_LOCATION_FAIL,
    error: error,
  };
};

export const deleteLocationStart = () => {
  return {
    type: actionTypes.DELETE_LOCATION_START,
  };
};

export const deleteLocation = (location) => {
  return {
    type: actionTypes.DELETE_LOCATION,
    location: location,
  };
};
/// DELETE LOCATION

/// VIEW AUDIT LOGS
export const fetchAuditLogsSuccess = (auditLogs) => {
  return {
    type: actionTypes.FETCH_LOCATION_AUDIT_LOGS_SUCCESS,
    auditLogs: auditLogs,
  };
};

export const fetchAuditLogsFail = (error) => {
  return {
    type: actionTypes.FETCH_LOCATION_AUDIT_LOGS_FAIL,
    error: error,
  };
};

export const fetchAuditLogsStart = () => {
  return {
    type: actionTypes.FETCH_LOCATION_AUDIT_LOGS_START,
  };
};

export const fetchAuditLogs = (location) => {
  return {
    type: actionTypes.FETCH_LOCATION_AUDIT_LOGS,
    location: location,
  };
};
/// VIEW AUDIT LOGS
