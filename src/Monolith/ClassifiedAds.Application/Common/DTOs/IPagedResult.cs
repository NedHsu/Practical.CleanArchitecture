namespace ClassifiedAds.Application.Common.DTOs
{
    public interface IPagedResult
    {
        int TotalPages { get; }

        int TotalCount { get; }

        int PageIndex { get; }
    }
}