namespace ClassifiedAds.Domain.DTOs
{
    public class StockFunderScoreDTO
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal? CreditScore { get; set; }
        public decimal? ForeignScore { get; set; }
    }
}
