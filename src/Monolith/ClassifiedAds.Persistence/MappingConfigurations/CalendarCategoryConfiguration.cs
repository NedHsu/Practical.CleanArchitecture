using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class CalendarCategoryConfiguration : IEntityTypeConfiguration<CalendarCategory>
    {
        public void Configure(EntityTypeBuilder<CalendarCategory> builder)
        {
            builder.ToTable("CalendarCategorys");
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).HasMaxLength(20);

            builder.HasData(new List<CalendarCategory> {
                 new CalendarCategory {
                     Id = 1,
                     Name = "Place",
                     CreatedDateTime = new DateTime(2021, 10, 3),
                 },
                 new CalendarCategory {
                     Id = 2,
                     Name = "Activity",
                     CreatedDateTime = new DateTime(2021, 10, 3),
                 },
                 new CalendarCategory {
                     Id = 3,
                     Name = "Game",
                     CreatedDateTime = new DateTime(2021, 10, 3),
                 },
             });
        }
    }
}
