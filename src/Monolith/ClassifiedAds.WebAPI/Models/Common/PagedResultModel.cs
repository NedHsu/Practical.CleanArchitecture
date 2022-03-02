using ClassifiedAds.Domain.Entities;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Models.Common
{
    public class PagedResultModel<T>
    {
        public PagedResultModel(uint totalPages, uint totalCount, uint pageIndex, IEnumerable<T> items)
        {
            TotalPages = totalPages;
            TotalCount = totalCount;
            PageIndex = pageIndex;
            Items = items;
        }

        public uint TotalPages { get; }

        public uint TotalCount { get; }

        public uint PageIndex { get; }

        public IEnumerable<T> Items { get; }

        public static PagedResultModel<T> CreatePagedResult<P>(P paged, IEnumerable<T> items)
            where P : IPagedResult
            => new PagedResultModel<T>(paged.TotalPages, paged.TotalCount, paged.PageIndex, items);
    }
}