using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public class StockEPS
    {
        /// <summary>
        /// 證券代號
        /// </summary>
        [Key]
        public string StockCode { get; set; }

        /// <summary>
        /// 年
        /// </summary>
        [Key]
        public int Year { get; set; }

        /// <summary>
        /// EPS
        /// </summary>
        public decimal EPS { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}
