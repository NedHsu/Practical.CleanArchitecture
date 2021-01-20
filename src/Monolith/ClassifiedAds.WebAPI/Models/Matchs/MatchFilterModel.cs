using System;
using ClassifiedAds.WebAPI.Models.Common;

namespace ClassifiedAds.WebAPI.Models.Matchs
{
    public class MatchFilterModel
    {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Guid? Creater { get; set; }

        public int? Type { get; set; }

        public PagerModel Pager { get; set; }
    }
}