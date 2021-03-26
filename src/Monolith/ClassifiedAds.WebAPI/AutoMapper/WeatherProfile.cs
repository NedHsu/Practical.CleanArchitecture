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
        }
    }
}
