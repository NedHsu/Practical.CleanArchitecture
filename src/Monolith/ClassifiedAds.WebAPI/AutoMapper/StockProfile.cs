using AutoMapper;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Common;
using ClassifiedAds.WebAPI.Models.Jobs;
using ClassifiedAds.WebAPI.Models.JobSrcs;
using ClassifiedAds.WebAPI.Models.StockDays;
using ClassifiedAds.WebAPI.Models.StockEPSs;
using ClassifiedAds.WebAPI.Models.StockFunders;
using ClassifiedAds.WebAPI.Models.StockGroupItems;
using ClassifiedAds.WebAPI.Models.StockGroups;
using ClassifiedAds.WebAPI.Models.StockMargins;
using ClassifiedAds.WebAPI.Models.StockNotes;
using ClassifiedAds.WebAPI.Models.StockProfits;
using ClassifiedAds.WebAPI.Models.StockRevenues;
using ClassifiedAds.WebAPI.Models.Stocks;
using ClassifiedAds.WebAPI.Models.StockSeminars;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class StockProfile : Profile
    {
        public StockProfile()
        {
            CreateMap<StockModel, Stock>();
            CreateMap<Stock, StockModel>()
                .ForMember(x => x.FetchDate, opt => opt.MapFrom(src => src.FetchDate.HasValue ? src.FetchDate.Value.ToString("yyyy-MM-dd") : string.Empty));

            CreateMap<StockExtraDTO, StockExtraModel>()
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
            CreateMap<StockRevenueDTO, StockRevenueModel>()
                .ForMember(x => x.Month, opt => opt.MapFrom(src => src.Date.ToString("yyyy/MM")));
            CreateMap(typeof(PagedResult<>), typeof(PagedResultModel<>));
            CreateMap<StockProfit, StockProfitModel>()
                .ForMember(x => x.Date, opt => opt.MapFrom(src => src.Date.AddYears(-1911).AddMonths(-(src.Date.Month / 3) * 2).ToString("yyy/MM")));
            CreateMap<StockRevenue, StockRevenueModel>()
                .ForMember(x => x.Month, opt => opt.MapFrom(src => src.Date.AddYears(-1911).ToString("yyy/MM")));
            CreateMap<StockSeminarDTO, StockSeminarModel>();
            CreateMap<List<StockMarginFunderDTO>, StockMarginFundersModel>()
                .ForMember(x => x.Date, opt => opt.MapFrom(src => src.Select(x => x.Date.ToString("yyyy-MM-dd"))))
                .ForMember(x => x.ForeignBuy, opt => opt.MapFrom(src => src.Select(x => x.ForeignBuy)))
                .ForMember(x => x.ForeignSell, opt => opt.MapFrom(src => src.Select(x => x.ForeignSell)))
                .ForMember(x => x.ForeignSum, opt => opt.MapFrom(src => src.Select(x => x.ForeignSum)))
                .ForMember(x => x.ForeignSelfBuy, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfBuy)))
                .ForMember(x => x.ForeignSelfSell, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfSell)))
                .ForMember(x => x.ForeignSelfSum, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfSum)))
                .ForMember(x => x.CreditBuy, opt => opt.MapFrom(src => src.Select(x => x.CreditBuy)))
                .ForMember(x => x.CreditSell, opt => opt.MapFrom(src => src.Select(x => x.CreditSell)))
                .ForMember(x => x.CreditSum, opt => opt.MapFrom(src => src.Select(x => x.CreditSum)))
                .ForMember(x => x.SelfBuySell, opt => opt.MapFrom(src => src.Select(x => x.SelfBuySell)))
                .ForMember(x => x.SelfBuy, opt => opt.MapFrom(src => src.Select(x => x.SelfBuy)))
                .ForMember(x => x.SelfSell, opt => opt.MapFrom(src => src.Select(x => x.SelfSell)))
                .ForMember(x => x.SelfSum, opt => opt.MapFrom(src => src.Select(x => x.SelfSum)))
                .ForMember(x => x.SelfHedgingBuy, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingBuy)))
                .ForMember(x => x.SelfHedgingSell, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingSell)))
                .ForMember(x => x.SelfHedgingSum, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingSum)))
                .ForMember(x => x.Total, opt => opt.MapFrom(src => src.Select(x => x.Total)))
                .ForMember(x => x.FinancingBuy, opt => opt.MapFrom(src => src.Select(x => x.FinancingBuy)))
                .ForMember(x => x.FinancingSell, opt => opt.MapFrom(src => src.Select(x => x.FinancingSell)))
                .ForMember(x => x.FinancingBack, opt => opt.MapFrom(src => src.Select(x => x.FinancingBack)))
                .ForMember(x => x.FinancingBeforeBalance, opt => opt.MapFrom(src => src.Select(x => x.FinancingBeforeBalance)))
                .ForMember(x => x.FinancingBalance, opt => opt.MapFrom(src => src.Select(x => x.FinancingBalance)))
                .ForMember(x => x.FinancingLimit, opt => opt.MapFrom(src => src.Select(x => x.FinancingLimit)))
                .ForMember(x => x.SecuritiesBuy, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesBuy)))
                .ForMember(x => x.SecuritiesSell, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesSell)))
                .ForMember(x => x.SecuritiesBack, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesBack)))
                .ForMember(x => x.SecuritiesBeforeBalance, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesBeforeBalance)))
                .ForMember(x => x.SecuritiesBalance, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesBalance)))
                .ForMember(x => x.SecuritiesLimit, opt => opt.MapFrom(src => src.Select(x => x.SecuritiesLimit)))
                .ForMember(x => x.Offset, opt => opt.MapFrom(src => src.Select(x => x.Offset)))
                .ForMember(x => x.Remark, opt => opt.MapFrom(src => src.Select(x => x.Remark)))
                ;
            CreateMap<List<StockFunder>, StockFunderDayModel>()
                .ForMember(x => x.Date, opt => opt.MapFrom(src => src.Select(x => x.Date.ToString("yyyy-MM-dd"))))
                .ForMember(x => x.ForeignBuy, opt => opt.MapFrom(src => src.Select(x => x.ForeignBuy)))
                .ForMember(x => x.ForeignSell, opt => opt.MapFrom(src => src.Select(x => x.ForeignSell)))
                .ForMember(x => x.ForeignSum, opt => opt.MapFrom(src => src.Select(x => x.ForeignSum)))
                .ForMember(x => x.ForeignSelfBuy, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfBuy)))
                .ForMember(x => x.ForeignSelfSell, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfSell)))
                .ForMember(x => x.ForeignSelfSum, opt => opt.MapFrom(src => src.Select(x => x.ForeignSelfSum)))
                .ForMember(x => x.CreditBuy, opt => opt.MapFrom(src => src.Select(x => x.CreditBuy)))
                .ForMember(x => x.CreditSell, opt => opt.MapFrom(src => src.Select(x => x.CreditSell)))
                .ForMember(x => x.CreditSum, opt => opt.MapFrom(src => src.Select(x => x.CreditSum)))
                .ForMember(x => x.SelfBuySell, opt => opt.MapFrom(src => src.Select(x => x.SelfBuySell)))
                .ForMember(x => x.SelfBuy, opt => opt.MapFrom(src => src.Select(x => x.SelfBuy)))
                .ForMember(x => x.SelfSell, opt => opt.MapFrom(src => src.Select(x => x.SelfSell)))
                .ForMember(x => x.SelfSum, opt => opt.MapFrom(src => src.Select(x => x.SelfSum)))
                .ForMember(x => x.SelfHedgingBuy, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingBuy)))
                .ForMember(x => x.SelfHedgingSell, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingSell)))
                .ForMember(x => x.SelfHedgingSum, opt => opt.MapFrom(src => src.Select(x => x.SelfHedgingSum)))
                .ForMember(x => x.Total, opt => opt.MapFrom(src => src.Select(x => x.Total)))
                ;
            CreateMap<StockFetchDatesDTO, StockFetchDatesModel>()
                .ForMember(x => x.StockDay, opt => opt.MapFrom(src => src.StockDay.ToString("yyyy-MM-dd")))
                .ForMember(x => x.StockFundamental, opt => opt.MapFrom(src => src.StockFundamental.ToString("yyyy-MM-dd")))
                .ForMember(x => x.StockFunder, opt => opt.MapFrom(src => src.StockFunder.ToString("yyyy-MM-dd")))
                .ForMember(x => x.StockMargin, opt => opt.MapFrom(src => src.StockMargin.ToString("yyyy-MM-dd")))
                .ForMember(x => x.StockRevenue, opt => opt.MapFrom(src => src.StockRevenue.ToString("yyyy-MM-dd")))
                ;
            CreateMap<Job, JobModel>()
                ;
            CreateMap<JobModel, Job>()
                ;
            CreateMap<JobSrc, JobSrcModel>()
                ;
            CreateMap<StockEPS, StockEPSModel>()
                ;
            CreateMap<StockEPSModel, StockEPS>()
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
                ;
        }
    }
}