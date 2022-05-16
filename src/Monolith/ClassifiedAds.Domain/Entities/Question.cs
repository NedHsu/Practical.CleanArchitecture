using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("Questions")]
    public class Question
    {
        [Key]
        public Guid Id { get; set; }

        public int Sort { get; set; }

        public string Content { get; set; }

        public List<QuestionOption> QuestionOptions { get; set; }

        public List<Quiz> Quizzes { get; set; }

        public List<QuestionGroup> QuestionGroups { get; set; }
    }
}