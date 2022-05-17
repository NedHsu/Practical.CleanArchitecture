using System;

namespace ClassifiedAds.Application.Words.DTOs
{
    public class WordDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
