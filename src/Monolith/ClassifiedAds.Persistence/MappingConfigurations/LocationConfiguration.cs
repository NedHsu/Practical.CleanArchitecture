using System;
using System.Collections.Generic;
using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations {
    public class LocationConfiguration : IEntityTypeConfiguration<Location> {
        public void Configure(EntityTypeBuilder<Location> builder) {
            builder.ToTable("Locations");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.Property(x => x.Name).HasMaxLength(20);

            builder.HasData(new List<Location> {
                new Location {
                    Id = new Guid("e918f3d2-4c2e-4545-8d32-885867bcb397"),
                        Description = "",
                        CreatedDateTime = DateTime.Now,
                        Name = "天橋下",
                        Latitude = 24.227144866802035,
                        Longitude = 120.62602541304933
                },
                new Location {
                    Id = new Guid("a701958a-a94d-4d52-bc0f-c5d6dabad302"),
                        Description = "",
                        CreatedDateTime = DateTime.Now,
                        Latitude = 24.227144866802035,
                        Longitude = 120.72602541304933,
                        Name = "台北車站"
                },
                new Location {
                    Id = new Guid("84b3cbd6-7df2-4fdd-b316-432203354329"),
                        Description = "",
                        CreatedDateTime = DateTime.Now,
                        Latitude = 24.127144866802035,
                        Longitude = 120.62602541304933,
                        Name = "日月潭"
                }
            });
        }
    }
}