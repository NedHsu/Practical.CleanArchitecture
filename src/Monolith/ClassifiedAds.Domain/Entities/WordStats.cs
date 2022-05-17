using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("WordStats")]
    public class WordStats
    {
        [Key]
        public Guid Id { get; set; }

        public int Wrong { get; set; }

        public int Correct { get; set; }

        public Word Word { get; set; }

        public User User { get; set; }
    }
}