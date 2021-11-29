﻿using System;

namespace ClassifiedAds.Application.StockNews.DTOs
{
    public class StockNewDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
