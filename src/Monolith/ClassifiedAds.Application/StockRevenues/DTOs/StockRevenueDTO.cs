﻿using System;

namespace ClassifiedAds.Application.StockRevenues.DTOs
{
    public class StockRevenueDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}