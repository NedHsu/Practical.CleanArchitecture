using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassifiedAds.Domain.Entities
{
    [Table("CalendarCategorys")]
    public class CalendarCategory : AggregateRoot<int>
    {
        public string Name { get; set; }
    }
}