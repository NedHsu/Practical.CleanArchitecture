using System.Collections.Generic;

namespace ClassifiedAds.Blazor.Modules.Core.Models {
    public class PagedResultModel<T> 
    {
        public int TotalPages { get; set; }

        public int TotalCount { get; set; }

        public int PageIndex { get; set; }

        public List<T> Items { get; set; }
    }
}