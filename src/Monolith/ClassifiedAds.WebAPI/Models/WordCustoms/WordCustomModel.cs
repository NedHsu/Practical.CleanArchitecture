using System;

namespace ClassifiedAds.WebAPI.Models.WordCustoms
{
    public class WordCustomModel
    {
        public Guid? Id { get; set; }

        public string Text { get; set; }

        public string PartOfSpeach { get; set; }

        public string Description { get; set; }

        public Guid? WordId { get; set; }
    }
}
