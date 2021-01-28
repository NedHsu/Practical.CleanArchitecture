using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Players.Models
{
    public class PlayerModel
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(10)]
        public string Name { get; set; }

        public string Photo { get; set; }
    }
}
