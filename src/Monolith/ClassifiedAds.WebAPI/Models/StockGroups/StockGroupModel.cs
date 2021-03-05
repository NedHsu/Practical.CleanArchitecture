using System;

namespace ClassifiedAds.WebAPI.Models.StockGroups
{
    public class StockGroupModel
    {
        public string Ex { get; set; }

        public string Title { get; set; }

        public int Sort { get; set; }

        public string Note { get; set; }

        public string Industry { get; set; }

        public string CFICode { get; set; }
    }
}
