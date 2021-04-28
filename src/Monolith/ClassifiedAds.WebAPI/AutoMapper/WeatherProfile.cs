using AutoMapper;
using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.WebAPI.Models.Weathers;
using System.Linq;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class WeatherProfile : Profile
    {
        public WeatherProfile()
        {
            CreateMap<ObservationLocation, ObservationLocationModel>()
                .ForMember(x => x.WeatherElement, opt => opt.MapFrom(src => src.WeatherElement.ToDictionary(x => x.ElementName, x => x.ElementValue)))
                .ForMember(x => x.Parameter, opt => opt.MapFrom(src => src.Parameter.ToDictionary(x => x.ParameterName, x => x.ParameterValue)));

            CreateMap<LocationWeather, RecentLocationModel>()
                .ForMember(x => x.Times, opt => opt.MapFrom(src => src.WeatherElement
                    .SelectMany(x => x.Time.Select(y => new { y.StartTime, y.EndTime, y.Parameter, x.ElementName }))
                    .GroupBy(x => new { x.StartTime, x.EndTime })
                    .Select(x => new RecentLocationModelTime
                    {
                        StartTime = x.Key.StartTime,
                        EndTime = x.Key.EndTime,
                        WeatherElement = x.ToDictionary(y => y.ElementName, y => y.Parameter),
                    })));
        }
    }
}
