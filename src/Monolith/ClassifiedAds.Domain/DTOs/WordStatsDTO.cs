using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class WordStatsDTO
    {
        public Guid Id { get; set; }

        public Guid WordId { get; set; }

        public string Text { get; set; }

        public string PartOfSpeach { get; set; }

        public string Description { get; set; }

        public DateTimeOffset? UpdatedDateTime { get; set; }

        public int Wrong { get; set; }

        public int Correct { get; set; }

        public string AudioFile { get; set; }
    }
}
