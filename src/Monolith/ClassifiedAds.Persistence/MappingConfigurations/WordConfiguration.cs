using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WordConfiguration : IEntityTypeConfiguration<Word>
    {
        public void Configure(EntityTypeBuilder<Word> builder)
        {
            builder.ToTable("Words");

            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.Property(x => x.PartOfSpeach).HasMaxLength(100);
            builder.Property(x => x.Text).HasMaxLength(100);
        }
    }
}
