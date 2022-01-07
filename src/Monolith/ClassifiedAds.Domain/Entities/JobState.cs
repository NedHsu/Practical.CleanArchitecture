using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class JobState
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }
        public DateTime CreatedAt { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
