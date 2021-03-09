using System;

namespace ClassifiedAds.WebAPI.Models.StockGroupItems
{
    public class StockGroupItemModel
    {
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public int Sort { get; set; }
    }
}
