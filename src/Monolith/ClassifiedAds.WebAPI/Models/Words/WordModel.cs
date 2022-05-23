using ClassifiedAds.Application;
using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.WebAPI.Models.Words
{
    public class WordModel
    {
        public Guid Id { get; set; }

        public string Text { get; set; }

        public string PartOfSpeach { get; set; }

        public string Description { get; set; }
    }
}
