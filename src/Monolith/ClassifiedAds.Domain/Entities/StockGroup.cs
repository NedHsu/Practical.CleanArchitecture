using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockGroup
    {
        [Key]
        public Guid Id { get; set; }
        public string GroupTitle { get; set; }
        public int? Sort { get; set; }
        public Guid Creater { get; set; }
    }
}
