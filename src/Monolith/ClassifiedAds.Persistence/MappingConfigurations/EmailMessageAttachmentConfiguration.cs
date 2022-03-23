using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class EmailMessageAttachmentConfiguration : IEntityTypeConfiguration<EmailMessageAttachment>
    {
        public void Configure(EntityTypeBuilder<EmailMessageAttachment> builder)
        {
            builder.ToTable("EmailMessageAttachments");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
        }
    }
}
