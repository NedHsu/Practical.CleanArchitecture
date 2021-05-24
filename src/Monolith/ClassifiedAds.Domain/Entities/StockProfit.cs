using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockProfit
    {
        /// <summary>
        /// 證券代號
        /// </summary>
        [Key]
        public string StockCode { get; set; }
        /// <summary>
        /// 年月
        /// </summary>
        [Key]
        public DateTime Date { get; set; }
        /// <summary>
        /// 營業收入(百萬元)
        /// </summary>
        public decimal Revenue { get; set; }
        /// <summary>
        /// 毛利率(%) (營業毛利)/(營業收入)
        /// </summary>
        public decimal Gross { get; set; }
        /// <summary>
        /// 營業利益率(%) (營業利益)/(營業收入)
        /// </summary>
        public decimal OperatingProfit { get; set; }
        /// <summary>
        /// 稅前純益率(%) (稅前純益)/(營業收入)
        /// </summary>
        public decimal UntaxedNetProfit { get; set; }
        /// <summary>
        /// 稅後純益率(%) (稅後純益)/(營業收入)
        /// </summary>
        public decimal NetProfit { get; set; }
    }
}
