using System;
namespace ClassifiedAds.Domain.Entities
{
    public class PagedResult<T> : IPagedResult
    {
        public uint TotalPages { get; }

        public uint TotalCount { get; }

        public uint PageIndex { get; }

        public List<T> Items { get; }

        public PagedResult(List<T> items, uint count, uint pageIndex, uint pageSize)
        {
            TotalPages = (uint)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            PageIndex = pageIndex;
            Items = items;
        }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public static PagedResult<T> Create(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = (uint)source.Count();
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new PagedResult<T>(items, count, (uint)pageIndex, (uint)pageSize);
        }
    }
}