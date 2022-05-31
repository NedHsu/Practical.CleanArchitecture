using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WordCustomConfiguration : IEntityTypeConfiguration<WordCustom>
    {
        public void Configure(EntityTypeBuilder<WordCustom> builder)
        {
            builder.ToTable("WordCustoms");

            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.Property(x => x.PartOfSpeach).HasMaxLength(100);
            builder.Property(x => x.Text).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(200);
        }
    }
}
