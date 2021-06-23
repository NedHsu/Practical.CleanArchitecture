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
                new WeatherCounty{ Id = Guid.Parse("babb1758-0017-4175-b9c3-38e049b68846"), Name = "宜蘭縣", Days = 2, Code = "F-D0047-001", },
                new WeatherCounty{ Id = Guid.Parse("d4b53288-49cb-44e1-8b28-90ec04b4195c"), Name = "宜蘭縣", Days = 7, Code = "F-D0047-003", },
                new WeatherCounty{ Id = Guid.Parse("e0a736c4-ba8f-4124-bf48-e9de8ed1d16d"), Name = "桃園市", Days = 2, Code = "F-D0047-005", },
                new WeatherCounty{ Id = Guid.Parse("32dd9d1c-55cd-424b-92e1-5ed720004845"), Name = "桃園市", Days = 7, Code = "F-D0047-007", },
                new WeatherCounty{ Id = Guid.Parse("82eb035f-eae1-4360-bb78-f987b183bb42"), Name = "新竹縣", Days = 2, Code = "F-D0047-009", },
                new WeatherCounty{ Id = Guid.Parse("06fbd6f2-d8c5-4924-99e2-fd8112decc41"), Name = "新竹縣", Days = 7, Code = "F-D0047-011", },
                new WeatherCounty{ Id = Guid.Parse("421795c8-1e24-4c19-bde5-78c5137d905e"), Name = "苗栗縣", Days = 2, Code = "F-D0047-013", },
                new WeatherCounty{ Id = Guid.Parse("39ec0ece-4d49-4cb2-8f0c-64acf6d95643"), Name = "苗栗縣", Days = 7, Code = "F-D0047-015", },
                new WeatherCounty{ Id = Guid.Parse("17f31102-2e51-4378-ace3-9b5e23a85a6a"), Name = "彰化縣", Days = 2, Code = "F-D0047-017", },
                new WeatherCounty{ Id = Guid.Parse("03e45768-8a35-444e-995a-f68e85cb0b5e"), Name = "彰化縣", Days = 7, Code = "F-D0047-019", },
                new WeatherCounty{ Id = Guid.Parse("dd91b198-7ade-4e10-8b9c-3c1c9719cd2d"), Name = "南投縣", Days = 2, Code = "F-D0047-021", },
                new WeatherCounty{ Id = Guid.Parse("6043ad51-1cdb-4a47-b989-907f72936b56"), Name = "南投縣", Days = 7, Code = "F-D0047-023", },
                new WeatherCounty{ Id = Guid.Parse("4ec5dea3-d645-465a-96b6-fc7f06b6be83"), Name = "雲林縣", Days = 2, Code = "F-D0047-025", },
                new WeatherCounty{ Id = Guid.Parse("a266fa96-d821-4db9-b778-b9221ebae850"), Name = "雲林縣", Days = 7, Code = "F-D0047-027", },
                new WeatherCounty{ Id = Guid.Parse("8fda063d-02ed-46ee-a7fa-712c784c9d2b"), Name = "嘉義縣", Days = 2, Code = "F-D0047-029", },
                new WeatherCounty{ Id = Guid.Parse("05d2f360-4969-44cc-a5d7-1317dee0b159"), Name = "嘉義縣", Days = 7, Code = "F-D0047-031", },
                new WeatherCounty{ Id = Guid.Parse("ea2408e7-49c0-475c-8822-c636ac2835fe"), Name = "屏東縣", Days = 2, Code = "F-D0047-033", },
                new WeatherCounty{ Id = Guid.Parse("5e50c861-2c10-4d6d-975d-5db31f20a0ad"), Name = "屏東縣", Days = 7, Code = "F-D0047-035", },
                new WeatherCounty{ Id = Guid.Parse("7c73d73c-cf66-4b18-80ab-15d6aba9df3b"), Name = "臺東縣", Days = 2, Code = "F-D0047-037", },
                new WeatherCounty{ Id = Guid.Parse("32dfe4e3-22f4-4dd8-8b3e-8a34f0a774fc"), Name = "臺東縣", Days = 7, Code = "F-D0047-039", },
                new WeatherCounty{ Id = Guid.Parse("dc24d0f7-3aa4-426f-8fd9-47554253cdb1"), Name = "花蓮縣", Days = 2, Code = "F-D0047-041", },
                new WeatherCounty{ Id = Guid.Parse("2c904e73-4570-49cb-999b-1fe1191f3d8e"), Name = "花蓮縣", Days = 7, Code = "F-D0047-043", },
                new WeatherCounty{ Id = Guid.Parse("0edd2960-e7b1-44eb-8c2a-36e98edc9770"), Name = "澎湖縣", Days = 2, Code = "F-D0047-045", },
                new WeatherCounty{ Id = Guid.Parse("2d86411a-b188-4b0b-bd40-c3d8ff61941f"), Name = "澎湖縣", Days = 7, Code = "F-D0047-047", },
                new WeatherCounty{ Id = Guid.Parse("bbfe386f-10b6-4932-a953-94d170b9a6c4"), Name = "基隆縣", Days = 2, Code = "F-D0047-049", },
                new WeatherCounty{ Id = Guid.Parse("4eaad933-ac46-4c98-9998-e96dd64f27c2"), Name = "基隆縣", Days = 7, Code = "F-D0047-051", },
                new WeatherCounty{ Id = Guid.Parse("48301eb9-991a-4c08-851a-a05a1c6d4d7b"), Name = "新竹市", Days = 2, Code = "F-D0047-053", },
                new WeatherCounty{ Id = Guid.Parse("4dce5ef8-9c57-4f95-875f-103e1326e065"), Name = "新竹市", Days = 7, Code = "F-D0047-055", },
                new WeatherCounty{ Id = Guid.Parse("1bc39b9c-86b9-43d1-801f-4972f3354ddd"), Name = "嘉義市", Days = 2, Code = "F-D0047-057", },
                new WeatherCounty{ Id = Guid.Parse("c1b28585-f0c8-41cf-b70e-70ecfc771042"), Name = "嘉義市", Days = 7, Code = "F-D0047-059", },
                new WeatherCounty{ Id = Guid.Parse("88e000ec-83a8-4f86-bc4e-3772e283167e"), Name = "臺北市", Days = 2, Code = "F-D0047-061", },
                new WeatherCounty{ Id = Guid.Parse("4e60efd6-4d22-4591-b0dc-c34f2e09bd11"), Name = "臺北市", Days = 7, Code = "F-D0047-063", },
                new WeatherCounty{ Id = Guid.Parse("0c715504-9c14-4a76-bc12-849f7d369d32"), Name = "高雄市", Days = 2, Code = "F-D0047-065", },
                new WeatherCounty{ Id = Guid.Parse("fb3f1f52-469e-49c6-a050-3927caf24d23"), Name = "高雄市", Days = 7, Code = "F-D0047-067", },
                new WeatherCounty{ Id = Guid.Parse("fe7a94b6-df39-4201-80ac-e27d53b86410"), Name = "新北市", Days = 2, Code = "F-D0047-069", },
                new WeatherCounty{ Id = Guid.Parse("f69047bf-d914-4719-a7f7-97f2615c9b49"), Name = "新北市", Days = 7, Code = "F-D0047-071", },
                new WeatherCounty{ Id = Guid.Parse("cc76844a-54bd-4b0b-8110-24c414602313"), Name = "臺中市", Days = 2, Code = "F-D0047-073", },
                new WeatherCounty{ Id = Guid.Parse("f247e1fd-b7fc-4bad-957b-7abfc7124583"), Name = "臺中市", Days = 7, Code = "F-D0047-075", },
                new WeatherCounty{ Id = Guid.Parse("a139d3ef-d748-47b3-b9e1-1e2934510106"), Name = "臺南市", Days = 2, Code = "F-D0047-077", },
                new WeatherCounty{ Id = Guid.Parse("0f1486e8-59f2-416a-86d8-cb53c99a9fd8"), Name = "臺南市", Days = 7, Code = "F-D0047-079", },
                new WeatherCounty{ Id = Guid.Parse("19a96483-3a2c-4fb3-8655-7b822ca9fc02"), Name = "連江縣", Days = 2, Code = "F-D0047-081", },
                new WeatherCounty{ Id = Guid.Parse("748e9ecd-0368-47a4-a9c4-3b145ca22f36"), Name = "連江縣", Days = 7, Code = "F-D0047-083", },
                new WeatherCounty{ Id = Guid.Parse("0589b0c0-bed9-4db1-9808-f7325274fe22"), Name = "金門縣", Days = 2, Code = "F-D0047-085", },
                new WeatherCounty{ Id = Guid.Parse("3e02913f-2974-4ca4-837a-56a27bdcb333"), Name = "金門縣", Days = 7, Code = "F-D0047-087", },
                new WeatherCounty{ Id = Guid.Parse("21e1bc17-d9d3-4c33-8f56-3634e1e5180c"), Name = "臺灣", Days = 2, Code = "F-D0047-089", },
                new WeatherCounty{ Id = Guid.Parse("5c0a3b46-d016-4ffc-8127-9052541fb331"), Name = "臺灣", Days = 7, Code = "F-D0047-091", },
            });
        }
    }
}