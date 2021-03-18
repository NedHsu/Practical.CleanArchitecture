using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace ClassifiedAds.Application.Weathers.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly WeatherServiceConfigs configs;

        public WeatherService(HttpClient httpClient, WeatherServiceConfigs configs, ICurrentUser currentUser)
        {
            _httpClient = httpClient;
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
            var response = _httpClient.GetAsync($"{api}?Authorization={configs.Key}" + GetParamters(query));
            return response.Result.Content.ReadAs<TResult>().Result;
        }

        public List<WeatherDTO> GetAll()
        {
            throw new NotImplementedException();
        }

        public CountyResponse GetByCountry(GetCountyWeatherQuery query)
        {
            return GetResponse<GetCountyWeatherQuery, CountyResponse>(query, $"/v1/rest/datastore/{query.Country}");
        }

        public EarthquakeResponse GetEarthquake(GetEarthquakerQuery query)
        {
            return GetResponse<GetEarthquakerQuery, EarthquakeResponse>(query, "/v1/rest/datastore/E-A0015-001");
        }

        public RecentResponse GetRecent(GetRecentQuery query)
        {
            return GetResponse<GetRecentQuery, RecentResponse>(query, "/v1/rest/datastore/F-C0032-001");
        }

        public TidalResponse GetTida(GetTidalQuery query)
        {
            return GetResponse<GetTidalQuery, TidalResponse>(query, "/v1/rest/datastore/F-A0021-001");
        }

        public string GetParamters<T>(T query)
            where T : class
        {
            var t = typeof(T);
            var pInfos = t.GetProperties();
            var result = string.Empty;
            foreach (var p in pInfos)
            {
                var filedName = p.Name.Substring(0, 1).ToLower() + p.Name.Substring(1);
                var fieldValue = string.Empty;
                switch (Type.GetTypeCode(p.PropertyType))
                {
                    case TypeCode.DateTime:
                        fieldValue = ((DateTime)p.GetValue(query)).ToString("yyyy-MM-ddThh:mm:ss");
                        break;
                    case TypeCode.String:
                        fieldValue = p.GetValue(query).ToString();
                        break;
                    case TypeCode.Int32:
                        fieldValue = p.GetValue(query).ToString();
                        break;
                    case TypeCode.Object:
                        if (p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(List<string>))
                        {
                        }

                        break;
                }

                if (!string.IsNullOrEmpty(fieldValue))
                {
                    result += $"&{filedName}={fieldValue}";
                }
            }

            return result;
        }
    }
}
