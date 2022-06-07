namespace ClassifiedAds.Infrastructure.Payment.ECPay
{
    public class ECPayOptions
    {
        public string HashKey { get; set; }

        public string HashIV { get; set; }

        public string MerchantID { get; set; }

        public string PlatformID { get; set; }

        public string ServiceURL { get; set; }
        public string ReturnURL { get; set; }
        public string ClientBackURL { get; set; }
    }
}
