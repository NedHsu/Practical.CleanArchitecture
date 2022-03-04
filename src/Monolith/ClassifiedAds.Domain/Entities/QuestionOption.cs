using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class QuestionOption
    {
        [Key]
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string Value { get; set; }

        public bool IsAnswer { get; set; }

        public Guid QuestionId { get; set; }

        public Question Question { get; set; }
    }
}