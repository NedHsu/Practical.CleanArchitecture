using System;
using System.Collections.Generic;
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

            // builder.HasData(new List<MatchPlayer> {
            //     new MatchPlayer {
            //         Id = Guid.NewGuid(),
            //         Match = new Match { Id = new Guid("b0a18c7d-378c-4e8b-a323-89962754a063") },
            //         Player = new Player { Id = new Guid("57d2bbcd-0e82-4725-85a8-4b3347db4846") }
            //     },
            //     new MatchPlayer {
            //         Id = Guid.NewGuid(),
            //         Match = new Match { Id = new Guid("6f6520c9-848b-4ff8-a108-0f5c0ba2a2fa") },
            //         Player = new Player { Id = new Guid("57d2bbcd-0e82-4725-85a8-4b3347db4846") }
            //     },
            //     new MatchPlayer {
            //         Id = Guid.NewGuid(),
            //         Match = new Match { Id = new Guid("f9a13652-4809-40b7-8879-71a7aade9ac1") },
            //         Player = new Player { Id = new Guid("57d2bbcd-0e82-4725-85a8-4b3347db4846") }
            //     },
            // });
        }
    }
}
