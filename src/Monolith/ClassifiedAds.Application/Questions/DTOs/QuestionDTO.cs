using System;

namespace ClassifiedAds.Application.Questions.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
