using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WeatherStationConfiguration : IEntityTypeConfiguration<WeatherStation>
    {
        public void Configure(EntityTypeBuilder<WeatherStation> builder)
        {
            builder.ToTable("WeatherStations");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.Property(x => x.StationId).HasMaxLength(30);
            builder.Property(x => x.Name).HasMaxLength(20);
            builder.Property(x => x.Address).HasMaxLength(200);
        }
    }
}