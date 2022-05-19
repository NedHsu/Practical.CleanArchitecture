using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WordConfiguration : IEntityTypeConfiguration<Word>
    {
        public void Configure(EntityTypeBuilder<Word> builder)
        {
            builder.ToTable("Words");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.PartOfSpeach).HasMaxLength(10);
            builder.Property(x => x.Text).HasMaxLength(100);
        }
    }
}
