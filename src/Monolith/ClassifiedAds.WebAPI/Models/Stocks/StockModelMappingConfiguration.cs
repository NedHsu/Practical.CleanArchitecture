using ClassifiedAds.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.Models.Stocks
{
    public static class StockModelMappingConfiguration
    {
        public static IEnumerable<StockModel> ToDTOs(this IEnumerable<stock> entities)
        {
            return entities.Select(x => x.ToDTO());
        }

        public static StockModel ToDTO(this stock entity)
        {
            return new StockModel
            {
                Code = entity.code,
                Name = entity.name,
            };
        }

        public static stock ToEntity(this StockModel dto)
        {
            return new stock
            {
                code = dto.Code,
                name = dto.Name,
            };
        }
    }
}
