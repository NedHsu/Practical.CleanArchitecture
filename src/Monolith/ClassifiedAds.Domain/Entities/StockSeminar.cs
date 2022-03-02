using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    /// <summary>
    /// 法人說明會
    /// </summary>
    public partial class StockSeminar
    {
        /// <summary>
        /// 證券代號
        /// </summary>
        [Key]
        public string StockCode { get; set; }

        /// <summary>
        /// 時間
        /// </summary>
        [Key]
        public DateTime Date { get; set; }

        /// <summary>
        /// 地點
        /// </summary>
        public string Place { get; set; }

        /// <summary>
        /// 擇要訊息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 簡報內容(中文檔案)
        /// </summary>
        public string FileZh { get; set; }

        /// <summary>
        /// 簡報內容(英文檔案)
        /// </summary>
        public string FileEn { get; set; }

        /// <summary>
        /// 公司網站相關資訊
        /// </summary>
        public string Web { get; set; }

        /// <summary>
        /// 影音連結資訊
        /// </summary>
        public string Video { get; set; }

        /// <summary>
        /// 其他應敘明事項
        /// </summary>
        public string Remark { get; set; }
    }
}
