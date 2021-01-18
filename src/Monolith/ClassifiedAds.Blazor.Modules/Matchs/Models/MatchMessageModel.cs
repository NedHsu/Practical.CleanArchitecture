using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Matchs.Models {
    public class MatchMessageModel {
        public string CreaterName { get; set; }

        public string Content { get; set; }
    }
}