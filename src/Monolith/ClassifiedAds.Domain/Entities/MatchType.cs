namespace ClassifiedAds.Domain.Entities
{
    public class MatchType : AggregateRoot<int>
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
