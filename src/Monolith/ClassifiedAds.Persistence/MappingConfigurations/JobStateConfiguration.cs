using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class JobStateConfiguration : IEntityTypeConfiguration<JobState>
    {
        public void Configure(EntityTypeBuilder<JobState> builder)
        {
            builder.ToTable("JobState");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).HasMaxLength(20);
        }
    }
}
