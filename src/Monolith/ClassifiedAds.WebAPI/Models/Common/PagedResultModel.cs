using System.Collections.Generic;
using ClassifiedAds.Application.Common.DTOs;

namespace ClassifiedAds.WebAPI.Models.Common
{
    public class PagedResultModel<T>
    {
        public PagedResultModel(int totalPages, int totalCount, int pageIndex, IEnumerable<T> items)
        {
            TotalPages = totalPages;
            TotalCount = totalCount;
            PageIndex = pageIndex;
            Items = items;
        }

        public int TotalPages { get; }

        public int TotalCount { get; }

        public int PageIndex { get; }

        public IEnumerable<T> Items { get; }

        public static PagedResultModel<T> CreatePagedResult<P>(P paged, IEnumerable<T> items) where P : IPagedResult
            => new PagedResultModel<T>(paged.TotalPages, paged.TotalCount, paged.PageIndex, items);
    }

    
}