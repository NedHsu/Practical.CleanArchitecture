using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class QuestionGroupConfiguration : IEntityTypeConfiguration<QuestionGroup>
    {
        public void Configure(EntityTypeBuilder<QuestionGroup> builder)
        {
            builder.ToTable("QuestionGroups");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}
