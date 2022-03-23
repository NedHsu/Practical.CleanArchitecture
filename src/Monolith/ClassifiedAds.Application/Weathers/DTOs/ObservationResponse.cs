using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class ObservationResponse
    {
        [JsonPropertyName("success")]
        public string Success { get; set; }

        [JsonPropertyName("result")]
        public ObservationResult Result { get; set; }

        [JsonPropertyName("records")]
        public ObservationRecords Records { get; set; }
    }

    public class ObservationField
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }

    public class ObservationResult
    {
        [JsonPropertyName("resource_id")]
        public string ResourceId { get; set; }

        [JsonPropertyName("fields")]
        public List<ObservationField> Fields { get; set; }
    }

    public class ObservationTime
    {
        [JsonPropertyName("obsTime")]
        public string ObsTime { get; set; }
    }

    public class ObservationWeatherElement
    {
        [JsonPropertyName("elementName")]
        public string ElementName { get; set; }

        [JsonPropertyName("elementValue")]
        public object ElementValue { get; set; }
    }

    public class ObservationParameter
    {
        [JsonPropertyName("parameterName")]
        public string ParameterName { get; set; }

        [JsonPropertyName("parameterValue")]
        public string ParameterValue { get; set; }
    }

    public class ObservationLocation
    {
        [JsonPropertyName("lat")]
        public string Lat { get; set; }

        [JsonPropertyName("lon")]
        public string Lon { get; set; }

        [JsonPropertyName("locationName")]
        public string LocationName { get; set; }

        [JsonPropertyName("stationId")]
        public string StationId { get; set; }

        [JsonPropertyName("time")]
        public ObservationTime Time { get; set; }

        [JsonPropertyName("weatherElement")]
        public List<ObservationWeatherElement> WeatherElement { get; set; }

        [JsonPropertyName("parameter")]
        public List<ObservationParameter> Parameter { get; set; }
    }

    public class ObservationRecords
    {
        [JsonPropertyName("location")]
        public List<ObservationLocation> Location { get; set; }
    }
}
