﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.ToTable("Job");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Provider).HasMaxLength(10);
            builder.Property(x => x.Name).HasMaxLength(20);

            builder.HasIndex(x => new { x.Provider, x.Name });
        }
    }
}
