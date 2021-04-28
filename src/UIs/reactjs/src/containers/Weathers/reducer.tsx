import dayjs from "dayjs";
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

const weatherMap = {
  "Night": {
    "晴": {
      "": "RiMoonFill",
      "有霾": "RiMapPin3Fill",
      "有靄": "RiMapPin3Fill",
      "有閃電": "RiMapPin3Fill",
      "有雷聲": "RiMapPin3Fill",
      "有霧": "RiMapPin3Fill",
      "有雨": "RiMapPin3Fill",
      "有雨雪": "RiMapPin3Fill",
      "有大雪": "RiMapPin3Fill",
      "有雪珠": "RiMapPin3Fill",
      "有冰珠": "RiMapPin3Fill",
      "有陣雨": "RiMapPin3Fill",
      "陣雨雪": "RiMapPin3Fill",
      "有雹": "RiMapPin3Fill",
      "有雷雨": "RiMapPin3Fill",
      "有雷雪": "RiMapPin3Fill",
      "有雷雹": "RiMapPin3Fill",
      "大雷雨": "RiMapPin3Fill",
      "大雷雹": "RiMapPin3Fill",
      "有雷": "RiMapPin3Fill",
    },
    "多雲": {
      "": "RiMapPin3Fill",
      "有霾": "RiMapPin3Fill",
      "有靄": "RiMapPin3Fill",
      "有閃電": "RiMapPin3Fill",
      "有雷聲": "RiMapPin3Fill",
      "有霧": "RiMapPin3Fill",
      "有雨": "RiMapPin3Fill",
      "有雨雪": "RiMapPin3Fill",
      "有大雪": "RiMapPin3Fill",
      "有雪珠": "RiMapPin3Fill",
      "有冰珠": "RiMapPin3Fill",
      "有陣雨": "RiMapPin3Fill",
      "陣雨雪": "RiMapPin3Fill",
      "有雹": "RiMapPin3Fill",
      "有雷雨": "RiMapPin3Fill",
      "有雷雪": "RiMapPin3Fill",
      "有雷雹": "RiMapPin3Fill",
      "大雷雨": "RiMapPin3Fill",
      "大雷雹": "RiMapPin3Fill",
      "有雷": "RiMapPin3Fill",
    },
    "陰": {
      "": "RiMapPin3Fill",
      "有霾": "RiMapPin3Fill",
      "有靄": "RiMapPin3Fill",
      "有閃電": "RiMapPin3Fill",
      "有雷聲": "RiMapPin3Fill",
      "有霧": "RiMapPin3Fill",
      "有雨": "RiMapPin3Fill",
      "有雨雪": "RiMapPin3Fill",
      "有大雪": "RiMapPin3Fill",
      "有雪珠": "RiMapPin3Fill",
      "有冰珠": "RiMapPin3Fill",
      "有陣雨": "RiMapPin3Fill",
      "陣雨雪": "RiMapPin3Fill",
      "有雹": "RiMapPin3Fill",
      "有雷雨": "RiMapPin3Fill",
      "有雷雪": "RiMapPin3Fill",
      "有雷雹": "RiMapPin3Fill",
      "大雷雨": "RiMapPin3Fill",
      "大雷雹": "RiMapPin3Fill",
      "有雷": "RiMapPin3Fill",
    },
  },
  "Day": {
    "晴": {
      "": "RiSunFill",
      "有霾": "RiSunFoggyFill",
      "有靄": "RiSunFoggyFill",
      "有閃電": "RiMapPin3Fill",
      "有雷聲": "RiMapPin3Fill",
      "有霧": "RiSunFoggyFill",
      "有雨": "RiMapPin3Fill",
      "有雨雪": "RiMapPin3Fill",
      "有大雪": "RiMapPin3Fill",
      "有雪珠": "RiMapPin3Fill",
      "有冰珠": "RiMapPin3Fill",
      "有陣雨": "RiMapPin3Fill",
      "陣雨雪": "RiMapPin3Fill",
      "有雹": "RiMapPin3Fill",
      "有雷雨": "RiMapPin3Fill",
      "有雷雪": "RiMapPin3Fill",
      "有雷雹": "RiMapPin3Fill",
      "大雷雨": "RiMapPin3Fill",
      "大雷雹": "RiMapPin3Fill",
      "有雷": "RiMapPin3Fill",
    },
    "多雲": {
      "": "RiSunCloudyFill",
      "有霾": "RiFoggyFill",
      "有靄": "RiFoggyFill",
      "有閃電": "RiThunderstormsFill",
      "有雷聲": "RiThunderstormsFill",
      "有霧": "RiFoggyFill",
      "有雨": "RiDrizzleFill",
      "有雨雪": "RiSnowyFill",
      "有大雪": "RiSnowyFill",
      "有雪珠": "RiSnowyFill",
      "有冰珠": "RiHailFill",
      "有陣雨": "RiDrizzleFill",
      "陣雨雪": "RiSnowyFill",
      "有雹": "RiSnowyFill",
      "有雷雨": "RiThunderstormsFill",
      "有雷雪": "RiThunderstormsFill",
      "有雷雹": "RiThunderstormsFill",
      "大雷雨": "RiThunderstormsFill",
      "大雷雹": "RiThunderstormsFill",
      "有雷": "RiThunderstormsFill",
    },
    "陰": {
      "": "RiCloudy2Fill",
      "有霾": "RiFoggyFill",
      "有靄": "RiFoggyFill",
      "有閃電": "RiThunderstormsFill",
      "有雷聲": "RiThunderstormsFill",
      "有霧": "RiFoggyFill",
      "有雨": "RiDrizzleFill",
      "有雨雪": "RiSnowyFill",
      "有大雪": "RiSnowyFill",
      "有雪珠": "RiSnowyFill",
      "有冰珠": "RiHailFill",
      "有陣雨": "RiDrizzleFill",
      "陣雨雪": "RiSnowyFill",
      "有雹": "RiSnowyFill",
      "有雷雨": "RiThunderstormsFill",
      "有雷雪": "RiThunderstormsFill",
      "有雷雹": "RiThunderstormsFill",
      "大雷雨": "RiThunderstormsFill",
      "大雷雹": "RiThunderstormsFill",
      "有雷": "RiThunderstormsFill",
    },
  },
};

const wxMap = {
  "1": "RiSunFill",
  "2": "RiSunCloudyFill",
  "3": "RiSunCloudyFill",
  "4": "RiCloudyFill",
  "5": "RiCloudyFill",
  "6": "RiCloudyFill",
  "7": "RiCloudyFill",
  "8": "RiShowersFill",
  "9": "RiShowersFill",
  "10": "RiShowersFill",
  "11": "RiUmbrellaFill",
  "12": "RiUmbrellaFill",
  "13": "RiUmbrellaFill",
  "14": "RiUmbrellaFill",
  "15": "RiThunderstormsFill",
  "16": "RiThunderstormsFill",
  "17": "RiThunderstormsFill",
  "18": "RiThunderstormsFill",
  "19": "RiHeavyShowersFill",
  "20": "RiHeavyShowersFill",
  "21": "RiHeavyShowersFill",
  "22": "RiHeavyShowersFill",
  "23": "RiShowersFill",
  "24": "RiShowersFill",
  "25": "RiFoggyFill",
  "26": "RiFoggyFill",
  "27": "RiFoggyFill",
  "28": "RiFoggyFill",
  "29": "RiRainyFill",
  "30": "RiRainyFill",
  "31": "RiCloudWindyFill",
  "32": "RiCloudWindyFill",
  "33": "RiHeavyShowersFill",
  "34": "RiHeavyShowersFill",
  "35": "RiCloudWindyFill",
  "36": "RiCloudWindyFill",
  "37": "RiCloudWindyFill",
  "38": "RiCloudWindyFill",
  "39": "RiCloudWindyFill",
  "40": "RiCloudWindyFill",
  "41": "RiSnowyFill",
  "42": "RiSnowyFill",
}

const dayTimeRange = {
  start: "05:30",
  end: "18:00",
}

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
  try {
    for (let index = 0; index < action.weathers.length; index++) {
      const weather = action.weathers[index];
      for (let y = 0; y < weather.times.length; y++) {
        const item = weather.times[y];
        if (item.weatherElement?.Wx?.parameterValue) {
          item.icon = wxMap[item.weatherElement.Wx.parameterValue];
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

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
  let dayTag = getDayTag();
  let tmpWeatherMap = weatherMap[dayTag];
  let firstKeyRex = Object.keys(tmpWeatherMap).join("|");
  let weathers = [...action.weathers];
  for (let index = 0; index < weathers.length; index++) {
    const item = weathers[index];
    const weather = item.weatherElement?.Weather;
    item.icon = toWeatherIcon(weather, firstKeyRex, tmpWeatherMap);
  }
  return updateObject(state, {
    observations: weathers,
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
const getDayTag = () => {
  let now = dayjs();
  let nowDate = now.format("YYYY-M-DT");
  let start = dayjs(nowDate + dayTimeRange.start, "YYYY-M-DTHH:mm");
  let end = dayjs(nowDate + dayTimeRange.end, "YYYY-M-DTHH:mm");
  return now.isBefore(start) || now.isAfter(end) ? "Night" : "Day";
}

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
function toWeatherIcon(weather: any, firstKeyRex: string, tmpWeatherMap: any) {
  let icon = undefined;
  if (!weather || weather == "-99") {
    // default icon
  } else {
    let firstKeyMatches = weather.match(new RegExp(firstKeyRex));
    if (firstKeyMatches?.length > 0) {
      let firstKey = firstKeyMatches[0];
      let secondKey = weather.substr(firstKey.length);
      icon = tmpWeatherMap[firstKey][secondKey];
      // console.log(weather, item.icon);
    } else {
      // unkown
    }
  }
  return icon;
}

