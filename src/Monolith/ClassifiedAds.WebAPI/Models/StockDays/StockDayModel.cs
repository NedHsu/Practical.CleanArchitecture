using System;

namespace ClassifiedAds.WebAPI.Models.StockDays
{
    public class StockDayModel
    {
        public DateTime Date { get; set; }
        public long? DealAmount { get; set; }
        public long? DealMoney { get; set; }
        public decimal? OpenPrice { get; set; }
        public decimal? HighestPrice { get; set; }
        public decimal? LowestPrice { get; set; }
        public decimal? ClosePrice { get; set; }
        public int? DealCount { get; set; }
    }
}
