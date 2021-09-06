﻿using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities
{
    public class Calendar : AggregateRoot<Guid>
    {
        public string Name { get; set; }

        public string Color { get; set; }

        public string BgColor { get; set; }

        public string DragBgColor { get; set; }

        public string BorderColor { get; set; }

        public int CategoryId { get; set; }

        public CalendarCategory Category { get; set; }

        public Guid CreaterId { get; set; }

        public User Creater { get; set; }
    }
}