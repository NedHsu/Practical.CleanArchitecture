using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockGroups;
using ClassifiedAds.WebAPI.Models.StockNotes;
using ClassifiedAds.WebAPI.Models.Stocks;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class StockProfile : Profile
    {
        public StockProfile()
        {
            CreateMap<StockModel, stock>();
            CreateMap<stock, StockModel>();
            CreateMap<StockNote, StockNoteModel>();
            CreateMap<StockNoteModel, StockNote>();
            CreateMap<StockGroup, StockGroupModel>();
            CreateMap<StockGroupModel, StockGroup>();
        }
    }
}
