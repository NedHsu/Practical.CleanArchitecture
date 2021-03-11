using System;

namespace ClassifiedAds.WebAPI.Models.StockFundamentals
{
    public class StockFundamentalModel
    {
        public string Ex { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }

        public string Industry { get; set; }

        public string CFICode { get; set; }
    }
}
