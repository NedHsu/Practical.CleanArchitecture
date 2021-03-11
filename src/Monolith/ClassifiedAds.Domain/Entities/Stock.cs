using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MicroOrm.Dapper.Repositories.Attributes.Joins;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class Stock
    {
        public Stock()
        {
            StockDays = new HashSet<StockDay>();
        }

        [Key]
        public string Ex { get; set; }
        [Key]
        public string Code { get; set; }
        public decimal? ClosePrice { get; set; }
        public decimal? FivePrice { get; set; }
        public decimal? TenPrice { get; set; }
        public decimal? TwentyPrice { get; set; }
        public decimal? SixtyPrice { get; set; }
        public DateTime? FetchDate { get; set; }
        public string Name { get; set; }
        public DateTime? ListingDate { get; set; }
        public string Industry { get; set; }
        public string CFICode { get; set; }
        public string Note { get; set; }
        public string ISINCode { get; set; }

        [LeftJoin("StockDay", "Code", "StockCode", TableAlias = "StockDay_Id")]
        public virtual ICollection<StockDay> StockDays { get; set; }
        public virtual ICollection<StockGroupItem> StockGroupItems { get; set; }
        public virtual ICollection<StockNote> StockNotes { get; set; }
    }
}
