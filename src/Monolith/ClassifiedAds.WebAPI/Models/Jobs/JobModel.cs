using System;

namespace ClassifiedAds.WebAPI.Models.Jobs
{
    public class JobModel
    {
        public int Id { get; set; }
        public string Provider { get; set; }
        public string Name { get; set; }
        public string Arguments { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ExpireAt { get; set; }
    }
}
