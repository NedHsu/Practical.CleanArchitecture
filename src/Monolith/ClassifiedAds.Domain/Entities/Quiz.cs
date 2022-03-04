using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class Quiz
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public List<Question> Questions { get; set; }
    }
}