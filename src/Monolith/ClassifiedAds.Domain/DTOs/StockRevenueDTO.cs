﻿using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class StockRevenueDTO : Entities.StockRevenue
    {
        public string Name { get; set; }
        public decimal? ClosePrice { get; set; }
    }
}
