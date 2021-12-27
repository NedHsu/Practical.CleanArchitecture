using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class StockFetchDatesDTO
    {
        public DateTime StockDay { get; set; }

        public DateTime StockFunder { get; set; }

        public DateTime StockRevenue { get; set; }

        public DateTime StockFundamental { get; set; }

        public DateTime StockMargin { get; set; }
    }
}
