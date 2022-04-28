using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("QuestionAnswers")]
    public class QuestionAnswer
    {
        [Key]
        public Guid Id { get; set; }

        public Guid QuestionId { get; set; }
        public Question Question { get; set; }

        public Guid? OptionId { get; set; }
        public QuestionOption? QuestionOption { get; set; }

        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }
    }
}