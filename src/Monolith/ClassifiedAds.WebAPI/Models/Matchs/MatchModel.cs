using System;

namespace ClassifiedAds.WebAPI.Models.Matchs
{
    public class MatchModel
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int? MatchTypeId { get; set; }

        public Guid? LocationId { get; set; }

        public Guid CreaterId { get; set; }

    }
}