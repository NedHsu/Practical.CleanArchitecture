using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("Words")]
    public class Word : AggregateRoot<Guid>
    {
        public string Text { get; set; }

        public string PartOfSpeech { get; set; }

        public string Description { get; set; }

        public string AudioFile { get; set; }
    }
}