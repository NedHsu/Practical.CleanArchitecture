using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Application.Weathers.Services
{
    public class WeatherServiceConfigs
    {
        public string Key { get; set; }
        public string Server { get; set; }
        public int Timeout { get; set; }
    }
}
