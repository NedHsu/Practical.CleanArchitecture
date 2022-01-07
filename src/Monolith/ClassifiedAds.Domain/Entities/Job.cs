using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class Job
    {
        [Key]
        public int Id { get; set; }
        public string Provider { get; set; }
        public string Name { get; set; }
        public string Arguments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpireAt { get; set; }
    }
}
