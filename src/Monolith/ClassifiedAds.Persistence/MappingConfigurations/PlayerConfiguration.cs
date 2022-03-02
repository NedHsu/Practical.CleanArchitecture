using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder.ToTable("Players");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.Property(x => x.Name).HasMaxLength(50);

            // builder.HasData(new List<Player> {
            //     new Player {
            //         Id = new Guid("57d2bbcd-0e82-4725-85a8-4b3347db4846"),
            //         Name = "Ned",
            //         Gender = 1,
            //         Age = 18,
            //         User = new User {
            //             Id = new Guid("12837d3d-793f-ea11-becb-5cea1d05f660")
            //         }
            //     }
            // });
        }
    }
}
