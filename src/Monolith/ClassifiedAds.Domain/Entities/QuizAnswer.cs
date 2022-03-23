using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class QuizAnswer
    {
        public Quiz Quiz { get; set; }

        public User User { get; set; }

        public List<Question> Questions { get; set; }
    }
}