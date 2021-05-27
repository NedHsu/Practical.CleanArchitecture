﻿using System;

namespace ClassifiedAds.WebAPI.Models.StockRevenues
{
    public class StockRevenueModel
    {
        /// <summary>
        /// 證券代號
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 月份
        /// </summary>
        public string Date { get; set; }

        /// <summary>
        /// 當月營收
        /// </summary>
        public decimal CurrentMonth { get; set; }

        /// <summary>
        /// 上月營收
        /// </summary>
        public decimal PreMonth { get; set; }

        /// <summary>
        /// 去年當月營收
        /// </summary>
        public decimal PreYearMonth { get; set; }

        /// <summary>
        /// 上月比較增減(%)
        /// </summary>
        public decimal MoM { get; set; }

        /// <summary>
        /// 去年同月增減(%)
        /// </summary>
        public decimal YoY { get; set; }

        /// <summary>
        /// 當月累計營收
        /// </summary>
        public decimal YearTotal { get; set; }

        /// <summary>
        /// 去年累計營收
        /// </summary>
        public decimal PreYearTotal { get; set; }

        /// <summary>
        /// 前期比較增減(%)
        /// </summary>
        public decimal TotalMoM { get; set; }

        /// <summary>
        /// 備註
        /// </summary>
        public string Remarks { get; set; }
    }
}
