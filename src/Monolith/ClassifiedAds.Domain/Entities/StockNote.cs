using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockNote
    {
        [Key]
        public Guid Id { get; set; }
        public string StockCode { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public Guid? Creater { get; set; }
        public virtual Stock StockCodeNavigation { get; set; }

    }
}