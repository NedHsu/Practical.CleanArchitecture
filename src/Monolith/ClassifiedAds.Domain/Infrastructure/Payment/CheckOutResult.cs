using System.Collections;

namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public class CheckOutResult : IResult
    {
        public List<string> Errors { get; set; }
        public Hashtable Data { get; set; }
    }
}
