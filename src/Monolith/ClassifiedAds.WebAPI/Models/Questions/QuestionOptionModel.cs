using System;

namespace ClassifiedAds.WebAPI.Models.Questions
{
    public class QuestionOptionModel
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string Value { get; set; }

        public bool IsAnswer { get; set; }
    }
}
