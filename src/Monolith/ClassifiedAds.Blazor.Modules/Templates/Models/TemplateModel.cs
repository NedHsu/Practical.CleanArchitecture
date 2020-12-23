using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Templates.Models
{
    public class TemplateModel
    {
        public Guid Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Code { get; set; }

        [Required]
        [MaxLength(10)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
