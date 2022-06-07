namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public interface IPaymentManager
    {
        CheckOutResult CheckOut(CheckOutParameters paras);
        ActionResult Action(PaymentActionParameters paras);
    }
}
