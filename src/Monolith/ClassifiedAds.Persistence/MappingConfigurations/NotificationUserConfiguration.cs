using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class NotificationUserConfiguration : IEntityTypeConfiguration<NotificationUser>
    {
        public void Configure(EntityTypeBuilder<NotificationUser> builder)
        {
            builder.ToTable("NotificationUseres");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(x => x.Notification);
            builder.HasMany(x => x.Users);
        }
    }
}