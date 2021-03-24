using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
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

        public WeatherService(WeatherServiceConfigs configs)
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(configs.Server), Timeout = TimeSpan.FromSeconds(configs.Timeout) };
            this.configs = configs;
        }

        public AlarmResponse GetAlarm(GetWeatherAlarmQuery query)
        {
            var api = "/v1/rest/datastore/W-C0033-001";
            return GetResponse<GetWeatherAlarmQuery, AlarmResponse>(query, api);
        }

        private TResult GetResponse<TQuery, TResult>(TQuery query, string api)
            where TQuery : class
        {
            var response = _httpClient.GetAsync($"/api{api}?Authorization={configs.Key}" + ToParamters(query));
            return response.Result.Content.ReadAs<TResult>().Result;
        }

        public CountyResponse GetByCountry(GetWeatherCountyWeatherQuery query)
        {
            return GetResponse<GetWeatherCountyWeatherQuery, CountyResponse>(query, $"/v1/rest/datastore/{query.Country}");
        }

        public EarthquakeResponse GetEarthquake(GetWeatherEarthquakeQuery query)
        {
            return GetResponse<GetWeatherEarthquakeQuery, EarthquakeResponse>(query, "/v1/rest/datastore/E-A0015-001");
        }

        public RecentResponse GetRecent(GetWeatherRecentQuery query)
        {
            return GetResponse<GetWeatherRecentQuery, RecentResponse>(query, "/v1/rest/datastore/F-C0032-001");
        }

        public TidalResponse GetTida(GetWeatherTidalQuery query)
        {
            return GetResponse<GetWeatherTidalQuery, TidalResponse>(query, "/v1/rest/datastore/F-A0021-001");
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
    }
}
