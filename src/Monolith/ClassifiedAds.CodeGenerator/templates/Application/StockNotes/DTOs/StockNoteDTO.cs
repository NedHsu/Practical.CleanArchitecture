using System;

namespace ClassifiedAds.Application.StockNotes.DTOs
{
    public class StockNoteDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
