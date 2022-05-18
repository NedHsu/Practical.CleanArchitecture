﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    [Table("Words")]
    public class Word
    {
        [Key]
        public Guid Id { get; set; }

        public string Text { get; set; }

        public string PartOfSpeach { get; set; }

        public string Description { get; set; }
    }
}