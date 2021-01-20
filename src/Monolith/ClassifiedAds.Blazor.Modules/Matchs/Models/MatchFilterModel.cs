using System;
using System.ComponentModel.DataAnnotations;
using ClassifiedAds.Blazor.Modules.Core.Models;

namespace ClassifiedAds.Blazor.Modules.Matchs.Models {
    public class MatchFilterModel {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Guid? Creater { get; set; }

        public int? Type { get; set; }

        public PagerModel Pager { get; set; }
    }
}