using AutoMapper;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Common;
using ClassifiedAds.WebAPI.Models.StockDays;
using ClassifiedAds.WebAPI.Models.StockFunders;
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
            CreateMap<StockFunderDTO, StockFunderModel>()
                .ForMember(x => x.CreditBuy, opt => opt.MapFrom(src => src.CreditBuy / 1000.0))
                .ForMember(x => x.CreditSell, opt => opt.MapFrom(src => src.CreditSell / 1000.0))
                .ForMember(x => x.CreditSum, opt => opt.MapFrom(src => src.CreditSum / 1000.0))
                .ForMember(x => x.SelfBuy, opt => opt.MapFrom(src => src.SelfBuy / 1000.0))
                .ForMember(x => x.SelfSell, opt => opt.MapFrom(src => src.SelfSell / 1000.0))
                .ForMember(x => x.SelfSum, opt => opt.MapFrom(src => src.SelfSum / 1000.0))
                .ForMember(x => x.ForeignBuy, opt => opt.MapFrom(src => src.ForeignBuy / 1000.0))
                .ForMember(x => x.ForeignSell, opt => opt.MapFrom(src => src.ForeignSell / 1000.0))
                .ForMember(x => x.ForeignSum, opt => opt.MapFrom(src => src.ForeignSum / 1000.0))
                .ForMember(x => x.Total, opt => opt.MapFrom(src => src.Total / 1000.0))
                .ForMember(x => x.Date, opt => opt.MapFrom(src => src.Date.ToString("yyyy-MM-dd")));
            CreateMap(typeof(PagedResult<>), typeof(PagedResultModel<>));
        }
    }
}
