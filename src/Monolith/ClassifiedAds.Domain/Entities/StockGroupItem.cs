using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockGroupItem
    {
        [Key]
        public Guid Id { get; set; }
        public string StockCode { get; set; }
        public Guid GroupId { get; set; }
        public int Sort { get; set; }

        public virtual stock StockCodeNavigation { get; set; }
    }
}
