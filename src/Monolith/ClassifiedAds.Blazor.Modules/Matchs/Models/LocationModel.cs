using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Matchs.Models
{
    public class LocationModel
    {
        [Required]
        [MaxLength(10)]
        public string Name { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }

    }
}
