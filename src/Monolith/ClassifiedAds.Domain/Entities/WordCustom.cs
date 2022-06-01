using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("WordCustoms")]
    public class WordCustom : AggregateRoot<Guid>
    {
        public WordCustom()
        {
        }

        public WordCustom(Guid userId)
        {
            UserId = userId;
        }

        public string Text { get; set; }

        public string PartOfSpeech { get; set; }

        public string Description { get; set; }

        public Guid? WordId { get; set; }

        public Word? Word { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }
    }
}