using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class MatchPlayerConfiguration : IEntityTypeConfiguration<MatchPlayer>
    {
        public void Configure(EntityTypeBuilder<MatchPlayer> builder)
        {
            builder.ToTable("MatchPlayers");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(x => x.Match);
            builder.HasOne(x => x.Player);
        }
    }
}
