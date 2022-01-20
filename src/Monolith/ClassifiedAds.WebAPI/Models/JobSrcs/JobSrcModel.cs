using System;

namespace ClassifiedAds.WebAPI.Models.JobSrcs
{
    public class JobSrcModel
    {
        public string Provider { get; set; }

        public string Name { get; set; }

        public string Src { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public DateTimeOffset? UpdatedAt { get; set; }
    }
}
