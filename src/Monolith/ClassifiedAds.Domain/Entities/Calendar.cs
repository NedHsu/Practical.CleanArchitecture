using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassifiedAds.Domain.Entities
{
    [Table("Calendars")]
    public class Calendar : AggregateRoot<Guid>
    {
        public string Name { get; set; }

        public string Color { get; set; }

        public string BgColor { get; set; }

        public string DragBgColor { get; set; }

        public string BorderColor { get; set; }

        public int CategoryId { get; set; }

        public virtual CalendarCategory Category { get; set; }

        public Guid CreaterId { get; set; }

        public virtual User Creater { get; set; }
    }
}