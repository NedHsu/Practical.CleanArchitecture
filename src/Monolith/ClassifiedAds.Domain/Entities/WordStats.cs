using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("WordStats")]
    public class WordStats : AggregateRoot<Guid>
    {
        public int Wrong { get; set; }

        public int Correct { get; set; }

        public bool IsFav { get; set; }

        public Guid WordId { get; set; }
        public Word Word { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}