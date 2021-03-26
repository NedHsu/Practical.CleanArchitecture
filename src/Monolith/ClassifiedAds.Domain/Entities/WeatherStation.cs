using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MicroOrm.Dapper.Repositories.Attributes.Joins;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class WeatherStation : AggregateRoot<Guid>
    {
        public string StationId { get; set; }
        public string Name { get; set; }
        public decimal Elevation { get; set; }
        public float Lat { get; set; }
        public float Lon { get; set; }
        public string County { get; set; }
        public string Address { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
