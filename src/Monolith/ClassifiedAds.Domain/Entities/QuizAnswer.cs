#nullable disable

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassifiedAds.Domain.Entities
{
    [Table("QuizAnswers")]
    public class QuizAnswer
    {
        [Key]
        public Guid Id { get; set; }

        public Guid QuizId { get; set; }

        public Quiz Quiz { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

        public DateTime Created { get; set; }

        public List<QuestionAnswer> QuestionAnswers { get; set; }
    }
}