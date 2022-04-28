using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("Quizzes")]
    public class Quiz
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public List<Question> Questions { get; set; }
    }
}