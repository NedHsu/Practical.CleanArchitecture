using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class JobSrcConfiguration : IEntityTypeConfiguration<JobSrc>
    {
        public void Configure(EntityTypeBuilder<JobSrc> builder)
        {
            builder.ToTable("JobSrc");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Provider).HasMaxLength(10);
            builder.Property(x => x.Name).HasMaxLength(20);
            builder.HasIndex(x => new { x.Provider, x.Name });

            builder.HasData(new List<JobSrc>
            {
                new JobSrc
                {
                    Id = 1,
                    Provider = "go",
                    Name = "funder",
                    Src = @"jobs\stocks\funder1\funder1.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 2,
                    Provider = "go",
                    Name = "margin",
                    Src = @"jobs\stocks\margin\margin.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 3,
                    Provider = "go",
                    Name = "stock3",
                    Src = @"stock3\stock3.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 4,
                    Provider = "go",
                    Name = "fundamental",
                    Src = @"jobs\stocks\fundamental\fundamental.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 5,
                    Provider = "go",
                    Name = "revenue",
                    Src = @"jobs\stocks\revenue\revenue.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 6,
                    Provider = "go",
                    Name = "profit",
                    Src = @"jobs\stocks\profit\profit.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Id = 7,
                    Provider = "go",
                    Name = "seminar",
                    Src = @"jobs\stocks\seminar\seminar.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
            });
        }
    }
}
