using ClassifiedAds.Application;
using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.WebAPI.Models.Words
{
    public class WordStatsActionModel
    {
        public Guid WordId { get; set; }

        public bool? OK { get; set; }

        public bool? IsFav { get; set; }
    }
}
