using System;

namespace ClassifiedAds.WebAPI.Models.StockSeminars
{
    public class StockSeminarModel
    {
        /// <summary>
        /// 證券代號
        /// </summary>
        public string StockCode { get; set; }

        /// <summary>
        /// 公司名稱
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 時間
        /// </summary>
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
