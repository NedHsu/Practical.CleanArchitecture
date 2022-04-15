﻿using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class QuestionGroup
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public List<Question> Questions { get; set; }
    }
}