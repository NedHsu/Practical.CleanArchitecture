using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("QuestionGroups")]
    public class QuestionGroup
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public List<Question> Questions { get; set; }
    }
}