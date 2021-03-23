using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Locations;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class MatchProfile : Profile
    {
        public MatchProfile()
        {
            CreateMap<Location, LocationModel>();
        }
    }
}
