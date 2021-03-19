using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MicroOrm.Dapper.Repositories.Attributes.Joins;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class WeatherCounty : AggregateRoot<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int Days { get; set; }
    }
}
