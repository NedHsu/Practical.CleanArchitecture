using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Matchs.Models {
    public class MatchModel {
        public Guid Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Code { get; set; }

        [Required]
        [MaxLength(10)]
        public string Name { get; set; }

        public DateTime Time { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public LocationModel Location { get; set; }

        public MatchMessageModel Messages { get; set; }
    }
}