using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities
{
    public class CalendarCategory : AggregateRoot<int>
    {
        public string Name { get; set; }
    }
}