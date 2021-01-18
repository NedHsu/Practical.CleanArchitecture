using System;

namespace ClassifiedAds.Application.Matchs.DTOs
{
    public class MatchDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
