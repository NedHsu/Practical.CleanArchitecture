using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MicroOrm.Dapper.Repositories.Attributes.Joins;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class stock
    {
        public stock()
        {
            stockDays = new HashSet<stockDay>();
        }

        [Key]
        public string ex { get; set; }
        [Key]
        public string code { get; set; }
        public decimal? close_price { get; set; }
        public decimal? five_price { get; set; }
        public decimal? ten_price { get; set; }
        public decimal? twenty_price { get; set; }
        public decimal? sixty_price { get; set; }
        public DateTime? fetchDate { get; set; }
        public string name { get; set; }
        public DateTime? listing_date { get; set; }
        public string industry { get; set; }
        public string CFICode { get; set; }
        public string note { get; set; }
        public string ISINCode { get; set; }

        [LeftJoin("stockDay", "Code", "StockCode", TableAlias = "StockDay_Id")]
        public virtual ICollection<stockDay> stockDays { get; set; }
        public virtual ICollection<StockGroupItem> StockGroupItems { get; set; }
        public virtual ICollection<StockNote> StockNotes { get; set; }
    }
}
