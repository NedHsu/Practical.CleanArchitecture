using MicroOrm.Dapper.Repositories.Attributes;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class Job
    {
        [Key]
        [Identity]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Arguments { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ExpireAt { get; set; }
    }
}
