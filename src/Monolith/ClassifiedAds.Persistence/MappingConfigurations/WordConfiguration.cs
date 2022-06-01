﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WordConfiguration : IEntityTypeConfiguration<Word>
    {
        public void Configure(EntityTypeBuilder<Word> builder)
        {
            builder.ToTable("Words");

            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.Property(x => x.PartOfSpeech).HasMaxLength(100);
            builder.Property(x => x.Text).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(200);
            builder.Property(x => x.AudioFile).HasMaxLength(100);
        }
    }
}
