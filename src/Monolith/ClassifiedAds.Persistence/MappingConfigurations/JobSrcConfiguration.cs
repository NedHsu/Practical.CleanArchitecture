using System;
using System.Collections.Generic;
using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class JobSrcConfiguration : IEntityTypeConfiguration<JobSrc>
    {
        public void Configure(EntityTypeBuilder<JobSrc> builder)
        {
            builder.ToTable("JobSrc");

            builder.HasKey(x => new { x.Provider, x.Name });
            builder.Property(x => x.Provider).HasMaxLength(10);
            builder.Property(x => x.Name).HasMaxLength(20);

            builder.HasData(new List<JobSrc>
            {
                new JobSrc
                {
                    Provider = "go",
                    Name = "funder",
                    Src = @"jobs\stocks\funder1\funder1.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "margin",
                    Src = @"jobs\stocks\margin\margin.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "stock3",
                    Src = @"stock3\stock3.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "fundamental",
                    Src = @"jobs\stocks\fundamental\fundamental.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "revenue",
                    Src = @"jobs\stocks\revenue\revenue.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "profit",
                    Src = @"jobs\stocks\profit\profit.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
                new JobSrc
                {
                    Provider = "go",
                    Name = "seminar",
                    Src = @"jobs\stocks\seminar\seminar.go",
                    CreatedAt = new DateTimeOffset(2022, 1, 1, 0, 0, 0, 0, TimeSpan.FromHours(8)),
                },
            });
        }
    }
}
