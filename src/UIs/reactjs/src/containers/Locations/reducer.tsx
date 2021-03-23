import { updateObject } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

const initialState = {
  locations: [],
  location: {
    name: "",
    code: "",
    description: "",
  },
  auditLogs: [],
  loading: false,
  saved: false,
  deleted: false,
  error: null,
  geoMessage: "",
  geoLocation: "",
};

/// Locations
const fetchLocationsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchLocationsSuccess = (state, action) => {
  return updateObject(state, {
    locations: action.locations,
    loading: false,
  });
};

const fetchLocationsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Locations

/// Location
const fetchLocationStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchLocationSuccess = (state, action) => {
  return updateObject(state, {
    location: action.location,
    loading: false,
  });
};

const fetchLocationFail = (state, action) => {
  return updateObject(state, { loading: false });
};

/// Location

const saveLocationStart = (state, action) => {
  return updateObject(state, { loading: true, saved: false });
};

const saveLocationSuccess = (state, action) => {
  return updateObject(state, {
    location: action.location,
    loading: false,
    saved: true,
  });
};

const saveLocationFail = (state, action) => {
  return updateObject(state, { loading: false, saved: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LOCATIONS_START:
      return fetchLocationsStart(state, action);
    case actionTypes.FETCH_LOCATIONS_SUCCESS:
      return fetchLocationsSuccess(state, action);
    case actionTypes.FETCH_LOCATIONS_FAIL:
      return fetchLocationsFail(state, action);
    case actionTypes.FETCH_LOCATION_START:
      return fetchLocationStart(state, action);
    case actionTypes.FETCH_LOCATION_SUCCESS:
      return fetchLocationSuccess(state, action);
    case actionTypes.FETCH_LOCATION_FAIL:
      return fetchLocationFail(state, action);
    case actionTypes.UPDATE_LOCATION:
      return updateObject(state, { location: action.location });
    case actionTypes.RESET_LOCATION:
      return updateObject(state, initialState);
    case actionTypes.SAVE_LOCATION_START:
      return saveLocationStart(state, action);
    case actionTypes.SAVE_LOCATION_SUCCESS:
      return saveLocationSuccess(state, action);
    case actionTypes.SAVE_LOCATION_FAIL:
      return saveLocationFail(state, action);
    case actionTypes.DELETE_LOCATION_START:
      return updateObject(state, {
        location: action.location,
        loading: true,
        deleted: false,
      });
    case actionTypes.DELETE_LOCATION_SUCCESS:
      return updateObject(state, {
        location: initialState.location,
        loading: false,
        deleted: true,
      });
    case actionTypes.DELETE_LOCATION_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        deleted: false,
      });
    case actionTypes.FETCH_LOCATION_AUDIT_LOGS_START:
      return updateObject(state, {
        location: action.location,
        loading: true,
      });
    case actionTypes.FETCH_LOCATION_AUDIT_LOGS_SUCCESS:
      return updateObject(state, {
        auditLogs: action.auditLogs,
        loading: false,
      });
    case actionTypes.FETCH_LOCATION_AUDIT_LOGS_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
