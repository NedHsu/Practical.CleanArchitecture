using ClassifiedAds.Application;
using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.WebAPI.Models.Words
{
    public class WordModel : Word, ICommandAction
    {
        public Guid Id { get; set; }
        public string Text { get; set; }

        public Application.CUDActionType Action { get; set; }
    }
}
