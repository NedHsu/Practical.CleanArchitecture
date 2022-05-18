﻿using System;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Models.Questions
{
    public class QuestionModel
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public List<QuestionOptionModel> QuestionOptions { get; set; }
    }
}