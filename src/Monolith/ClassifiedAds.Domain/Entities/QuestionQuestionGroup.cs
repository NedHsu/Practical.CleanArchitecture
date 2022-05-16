using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("QuestionQuestionGroups")]
    public class QuestionQuestionGroup
    {
        [Key]
        public Guid Id { get; set; }

        public int Sort { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public List<Question> Questions { get; set; }

        public QuestionGroup QuestionGroup { get; set; }

        public Quiz Quiz { get; set; }
    }
}