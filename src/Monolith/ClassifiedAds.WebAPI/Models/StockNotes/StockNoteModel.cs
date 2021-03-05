using System;

namespace ClassifiedAds.WebAPI.Models.StockNotes
{
    public class StockNoteModel
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Contents { get; set; }

        public string StockCode { get; set; }
    }
}
