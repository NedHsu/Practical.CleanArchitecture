using ClassifiedAds.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.Models.Stocks
{
    public static class StockModelMappingConfiguration
    {
        public static IEnumerable<StockModel> ToDTOs(this IEnumerable<Stock> entities)
        {
            return entities.Select(x => x.ToDTO());
        }

        public static StockModel ToDTO(this Stock entity)
        {
            return new StockModel
            {
                Id = entity.Id,
                Code = entity.Code,
                Name = entity.Name,
            };
        }

        public static Stock ToEntity(this StockModel dto)
        {
            return new Stock
            {
                Id = dto.Id,
                Code = dto.Code,
                Name = dto.Name,
            };
        }
    }
}
