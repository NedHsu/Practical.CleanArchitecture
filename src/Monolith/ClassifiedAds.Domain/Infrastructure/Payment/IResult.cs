using System.Collections;

namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public interface IResult
    {
        List<string> Errors { get; set; }
    }
}
