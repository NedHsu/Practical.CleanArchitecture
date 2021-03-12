namespace ClassifiedAds.Domain.Entities
{
    public interface IPagedResult
    {
        uint TotalPages { get; }

        uint TotalCount { get; }

        uint PageIndex { get; }
    }
}