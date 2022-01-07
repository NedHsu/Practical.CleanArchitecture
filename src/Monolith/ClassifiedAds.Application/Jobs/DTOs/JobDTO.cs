using System;

namespace ClassifiedAds.Application.Jobs.DTOs
{
    public class JobDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
