using System;

namespace ClassifiedAds.WebAPI.Models.StockGroups
{
    public class StockGroupModel
    {
        public Guid? Id { get; set; }

        public string GroupTitle { get; set; }

        public int Sort { get; set; }
    }
}
