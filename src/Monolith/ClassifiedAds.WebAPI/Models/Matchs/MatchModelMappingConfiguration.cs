using ClassifiedAds.Application.Common.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Common;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.Models.Matchs
{
    public static class MatchModelMappingConfiguration
    {
        public static IEnumerable<MatchModel> ToDTOs(this IEnumerable<Match> entities)
        {
            return entities.Select(x => x.ToDTO());
        }

        public static PagedResultModel<MatchModel> ToDTO(this PagedResult<Match> paged)
        {
            return PagedResultModel<MatchModel>.CreatePagedResult(paged, paged.Items.ToDTOs());
        }

        public static MatchModel ToDTO(this Match entity)
        {
            return new MatchModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
            };
        }

        public static Match ToEntity(this MatchModel dto)
        {
            return new Match
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
            };
        }
    }
}
