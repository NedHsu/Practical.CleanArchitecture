using System.Collections.Generic;

namespace ClassifiedAds.Blazor.Modules.Core.Models {
    public class PagedResultModel<T> 
    {
        public int TotalPages { get; }

        public int TotalCount { get; }

        public int PageIndex { get; }

        public List<T> Items { get; }
    }
}