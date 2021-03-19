using System;
using System.Collections.Generic;
using ClassifiedAds.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassifiedAds.Persistence.MappingConfigurations
{
    public class WeatherCountyConfiguration : IEntityTypeConfiguration<WeatherCounty>
    {
        public void Configure(EntityTypeBuilder<WeatherCounty> builder)
        {
            builder.ToTable("WeatherCountys");
            builder.Property(x => x.Id).HasDefaultValueSql("newsequentialid()");
            builder.Property(x => x.Name).HasMaxLength(20);

            builder.HasData(new List<WeatherCounty> {
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "宜蘭縣", Days = 2, Code = "F-D0047-001", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "宜蘭縣", Days = 7, Code = "F-D0047-003", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "桃園市", Days = 2, Code = "F-D0047-005", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "桃園市", Days = 7, Code = "F-D0047-007", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新竹縣", Days = 2, Code = "F-D0047-009", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新竹縣", Days = 7, Code = "F-D0047-011", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "苗栗縣", Days = 2, Code = "F-D0047-013", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "苗栗縣", Days = 7, Code = "F-D0047-015", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "彰化縣", Days = 2, Code = "F-D0047-017", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "彰化縣", Days = 7, Code = "F-D0047-019", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "南投縣", Days = 2, Code = "F-D0047-021", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "南投縣", Days = 7, Code = "F-D0047-023", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "雲林縣", Days = 2, Code = "F-D0047-025", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "雲林縣", Days = 7, Code = "F-D0047-027", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "嘉義縣", Days = 2, Code = "F-D0047-029", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "嘉義縣", Days = 7, Code = "F-D0047-031", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "屏東縣", Days = 2, Code = "F-D0047-033", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "屏東縣", Days = 7, Code = "F-D0047-035", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺東縣", Days = 2, Code = "F-D0047-037", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺東縣", Days = 7, Code = "F-D0047-039", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "花蓮縣", Days = 2, Code = "F-D0047-041", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "花蓮縣", Days = 7, Code = "F-D0047-043", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "澎湖縣", Days = 2, Code = "F-D0047-045", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "澎湖縣", Days = 7, Code = "F-D0047-047", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "基隆縣", Days = 2, Code = "F-D0047-049", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "基隆縣", Days = 7, Code = "F-D0047-051", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新竹市", Days = 2, Code = "F-D0047-053", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新竹市", Days = 7, Code = "F-D0047-055", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "嘉義市", Days = 2, Code = "F-D0047-057", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "嘉義市", Days = 7, Code = "F-D0047-059", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺北市", Days = 2, Code = "F-D0047-061", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺北市", Days = 7, Code = "F-D0047-063", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "高雄市", Days = 2, Code = "F-D0047-065", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "高雄市", Days = 7, Code = "F-D0047-067", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新北市", Days = 2, Code = "F-D0047-069", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "新北市", Days = 7, Code = "F-D0047-071", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺中市", Days = 2, Code = "F-D0047-073", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺中市", Days = 7, Code = "F-D0047-075", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺南市", Days = 2, Code = "F-D0047-077", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺南市", Days = 7, Code = "F-D0047-079", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "連江縣", Days = 2, Code = "F-D0047-081", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "連江縣", Days = 7, Code = "F-D0047-083", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "金門縣", Days = 2, Code = "F-D0047-085", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "金門縣", Days = 7, Code = "F-D0047-087", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺灣", Days = 2, Code = "F-D0047-089", },
                new WeatherCounty{ Id = Guid.NewGuid(), Name = "臺灣", Days = 7, Code = "F-D0047-091", },
            });
        }
    }
}