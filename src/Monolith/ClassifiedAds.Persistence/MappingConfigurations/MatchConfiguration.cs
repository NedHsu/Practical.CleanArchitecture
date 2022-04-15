using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class MatchConfiguration : IEntityTypeConfiguration<Match>
    {
        public void Configure(EntityTypeBuilder<Match> builder)
        {
            builder.ToTable("Matches");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.Property(x => x.Name).HasMaxLength(20);
            builder.HasOne(x => x.Location);
            builder.HasMany(x => x.Players);

            // builder.HasData(new List<Match>() {
            //     new Match {
            //         Id = new Guid("b0a18c7d-378c-4e8b-a323-89962754a063"),
            //             Title = "一起打籃球",
            //             Name = "",
            //             Description = "3V3 自行報隊",
            //             CreatedDateTime = DateTime.Now,
            //             Creater = new User {
            //                 Id = new Guid("12837d3d-793f-ea11-becb-5cea1d05f660")
            //             },
            //             Location = new Location {
            //                 Id = new Guid("e918f3d2-4c2e-4545-8d32-885867bcb397")
            //             }
            //     },
            //     new Match {
            //         Id = new Guid("6f6520c9-848b-4ff8-a108-0f5c0ba2a2fa"),
            //             Title = "夜衝",
            //             Name = "",
            //             Description = "台北到台中",
            //             CreatedDateTime = DateTime.Now,
            //             Creater = new User {
            //                 Id = new Guid("12837d3d-793f-ea11-becb-5cea1d05f660")
            //             },
            //             Location = new Location {
            //                 Id = new Guid("a701958a-a94d-4d52-bc0f-c5d6dabad302")
            //             }
            //     },
            //     new Match {
            //         Id = new Guid("f9a13652-4809-40b7-8879-71a7aade9ac1"),
            //             Title = "單車",
            //             Name = "",
            //             Description = "日月潭環潭",
            //             CreatedDateTime = DateTime.Now,
            //             Creater = new User {
            //                 Id = new Guid("12837d3d-793f-ea11-becb-5cea1d05f660")
            //             },
            //             Location = new Location {
            //                 Id = new Guid("84b3cbd6-7df2-4fdd-b316-432203354329")
            //             }
            //     }
            // });
        }
    }
}