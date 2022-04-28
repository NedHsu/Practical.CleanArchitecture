using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("QuestionOptions")]
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