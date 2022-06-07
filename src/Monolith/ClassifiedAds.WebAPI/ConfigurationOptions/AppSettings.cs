using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.Infrastructure.Caching;
using ClassifiedAds.Infrastructure.Interceptors;
using ClassifiedAds.Infrastructure.Logging;
using ClassifiedAds.Infrastructure.MessageBrokers;
using ClassifiedAds.Infrastructure.Monitoring;
using ClassifiedAds.Infrastructure.Payment;
using ClassifiedAds.Infrastructure.Storages;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.ConfigurationOptions
{
    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }

        public LoggingOptions Logging { get; set; }

        public CachingOptions Caching { get; set; }

        public MonitoringOptions Monitoring { get; set; }

        public IdentityServerAuthentication IdentityServerAuthentication { get; set; }

        public string AllowedHosts { get; set; }

        public CORS CORS { get; set; }

        public StorageOptions Storage { get; set; }

        public MessageBrokerOptions MessageBroker { get; set; }

        public Dictionary<string, string> SecurityHeaders { get; set; }

        public InterceptorsOptions Interceptors { get; set; }

        public WeatherServiceConfigs WeatherConfigs { get; set; }

        public CertificatesOptions Certificates { get; set; }

        public PaymentOptions Payment { get; set; }
    }
}
