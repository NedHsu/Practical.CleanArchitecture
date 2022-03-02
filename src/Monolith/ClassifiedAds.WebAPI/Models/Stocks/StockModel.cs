namespace ClassifiedAds.WebAPI.Models.Stocks
{
    public class StockModel
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
    }
}
