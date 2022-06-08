namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public interface IPaymentManager
    {
        CheckOutResult CheckOut(CheckOutParameters paras);
        PayActionResult Action(PaymentActionParameters paras);
    }
}
