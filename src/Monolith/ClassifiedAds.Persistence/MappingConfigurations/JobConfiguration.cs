using System;
using System.Collections.Generic;
using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
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
        }
    }
}
