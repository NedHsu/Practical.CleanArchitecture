using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WordStatsConfiguration : IEntityTypeConfiguration<WordStats>
    {
        public void Configure(EntityTypeBuilder<WordStats> builder)
        {
            builder.ToTable("WordStats");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}
