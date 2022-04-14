using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace ClassifiedAds.Application.Weathers.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly WeatherServiceConfigs configs;
        private static Dictionary<ObservationType, string> observationTypeMap = new Dictionary<ObservationType, string>
        {
            { ObservationType.Unmanned, "O-A0001-001" },
            { ObservationType.Office, "O-A0003-001" },
        };

        public WeatherService(WeatherServiceConfigs configs)
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(configs.Server), Timeout = TimeSpan.FromSeconds(configs.Timeout ?? 60) };
            this.configs = configs;
        }

        public async Task<AlarmResponse> GetAlarm(GetWeatherAlarmQuery query)
        {
            var api = "/v1/rest/datastore/W-C0033-001";
            return await GetResponse<GetWeatherAlarmQuery, AlarmResponse>(query, api);
        }

        private async Task<TResult> GetResponse<TQuery, TResult>(TQuery query, string api)
            where TQuery : class
        {
            var response = _httpClient.GetAsync($"/api{api}?Authorization={configs.Key}" + ToParamters(query));
            return await response.Result.Content.ReadAs<TResult>();
        }

        public async Task<CountyResponse> GetByCountry(GetWeatherCountyWeatherQuery query)
        {
            return await GetResponse<GetWeatherCountyWeatherQuery, CountyResponse>(query, $"/v1/rest/datastore/{query.Country}");
        }

        public async Task<EarthquakeResponse> GetEarthquake(GetWeatherEarthquakeQuery query)
        {
            return await GetResponse<GetWeatherEarthquakeQuery, EarthquakeResponse>(query, "/v1/rest/datastore/E-A0015-001");
        }

        public async Task<RecentResponse> GetRecent(GetWeatherRecentQuery query)
        {
            return await GetResponse<GetWeatherRecentQuery, RecentResponse>(query, "/v1/rest/datastore/F-C0032-001");
        }

        public async Task<TidalResponse> GetTida(GetWeatherTidalQuery query)
        {
            return await GetResponse<GetWeatherTidalQuery, TidalResponse>(query, "/v1/rest/datastore/F-A0021-001");
        }

        public string ToParamters<T>(T query)
            where T : class
        {
            var t = typeof(T);
            var pInfos = t.GetProperties();
            var result = string.Empty;
            foreach (var p in pInfos)
            {
                var value = p.GetValue(query);
                if (value == null)
                {
                    continue;
                }

                var typeName = Nullable.GetUnderlyingType(p.PropertyType) != null ? p.PropertyType.GenericTypeArguments[0].Name : p.PropertyType.Name;
                var filedName = p.Name.Substring(0, 1).ToLower() + p.Name.Substring(1);
                var fieldValue = string.Empty;
                switch (typeName)
                {
                    case "DateTime":
                        fieldValue = ((DateTime)value).ToString("yyyy-MM-ddThh:mm:ss");
                        break;
                    case "String":
                        fieldValue = value?.ToString();
                        break;
                    case "Int32":
                        fieldValue = value?.ToString();
                        break;
                    case "String[]":
                        fieldValue = string.Join(",", (string[])value);
                        break;
                    case "DateTime[]":
                        fieldValue = string.Join(",", ((DateTime[])value).Select(x => x.ToString("yyyy-MM-ddThh:mm:ss")));
                        break;
                }

                if (!string.IsNullOrEmpty(fieldValue))
                {
                    result += $"&{filedName}={HttpUtility.UrlEncode(fieldValue)}";
                }
            }

            return result;
        }

        public async Task<ObservationResponse> GetObservation(GetWeatherObservationQuery query)
        {
            return await GetResponse<GetWeatherObservationQuery, ObservationResponse>(query, $"/v1/rest/datastore/{observationTypeMap[query.Type]}");
        }
    }
}
