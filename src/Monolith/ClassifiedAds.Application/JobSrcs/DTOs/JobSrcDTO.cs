using System;

namespace ClassifiedAds.Application.JobSrcs.DTOs
{
    public class JobSrcDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
