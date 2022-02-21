using AutoMapper.Configuration.Conventions;
using System;

namespace ClassifiedAds.WebAPI.Models.Stocks
{
    public class StockExtraModel
    {
        public string Ex { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }

        public string Industry { get; set; }

        public string CFICode { get; set; }

        public decimal? ClosePrice { get; set; }

        public decimal? FivePrice { get; set; }

        public decimal? TenPrice { get; set; }

        public decimal? TwentyPrice { get; set; }

        public decimal? SixtyPrice { get; set; }

        public string FetchDate { get; set; }

        public decimal? EPS { get; set; }

        public decimal? P_EPS { get; set; }

        public decimal? PE { get; set; }

        public decimal? P_PE { get; set; }

        public int? Year { get; set; }

        public int? P_Year { get; set; }
    }
}
