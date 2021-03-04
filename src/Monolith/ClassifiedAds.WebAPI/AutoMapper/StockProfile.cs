using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Stocks;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class StockProfile : Profile
    {
        public StockProfile()
        {
            CreateMap<StockModel, stock>();
            CreateMap<stock, StockModel>();
        }
    }
}
