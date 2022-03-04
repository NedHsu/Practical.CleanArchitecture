using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class Question
    {
        [Key]
        public Guid Id { get; set; }

        public string Content { get; set; }
    }
}