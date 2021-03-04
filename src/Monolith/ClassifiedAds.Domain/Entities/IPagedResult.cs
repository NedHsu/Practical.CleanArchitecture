namespace ClassifiedAds.Domain.Entities
{
    public interface IPagedResult
    {
        int TotalPages { get; }

        int TotalCount { get; }

        int PageIndex { get; }
    }
}