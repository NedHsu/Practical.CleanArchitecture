using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class QuestionAnswer
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid QuestionId { get; set; }
        public Question Question { get; set; }

        public Guid? OptionId { get; set; }
        public QuestionOption? QuestionOption { get; set; }
    }
}