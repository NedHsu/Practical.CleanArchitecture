using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace ClassifiedAds.Application.Common.DTOs
{
    public class PagedResult<T> : IPagedResult
    {
        public int TotalPages { get; }

        public int TotalCount { get; }

        public int PageIndex { get; }

        public IList<T> Items { get; }

        public PagedResult(IList<T> items, int count, int pageIndex, int pageSize)
        {
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            PageIndex = pageIndex;
            Items = items;
        }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public static PagedResult<T> Create(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new PagedResult<T>(items, count, pageIndex, pageSize);
        }

    }
}