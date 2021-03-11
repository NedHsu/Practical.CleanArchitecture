using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockDays;
using ClassifiedAds.WebAPI.Models.StockGroupItems;
using ClassifiedAds.WebAPI.Models.StockGroups;
using ClassifiedAds.WebAPI.Models.StockNotes;
using ClassifiedAds.WebAPI.Models.Stocks;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class StockProfile : Profile
    {
        public StockProfile()
        {
            CreateMap<StockModel, Stock>();
            CreateMap<Stock, StockModel>()
                .ForMember(x => x.FetchDate, opt => opt.MapFrom(src => src.FetchDate.HasValue ? src.FetchDate.Value.ToString("yyyy-MM-dd") : string.Empty));
            CreateMap<StockNote, StockNoteModel>();
            CreateMap<StockNoteModel, StockNote>();
            CreateMap<StockGroup, StockGroupModel>();
            CreateMap<StockGroupModel, StockGroup>();
            CreateMap<StockGroupItem, StockGroupItemModel>();
            CreateMap<StockDay, StockDayModel>();
        }
    }
}
