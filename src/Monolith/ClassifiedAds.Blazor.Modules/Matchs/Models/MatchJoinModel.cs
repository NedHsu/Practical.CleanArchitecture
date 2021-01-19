using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Matchs.Models {
    public class MatchJoinModel
    {
        [Required]
        public int Number { get; set; }

        public string Remark { get; set; }
    }
}