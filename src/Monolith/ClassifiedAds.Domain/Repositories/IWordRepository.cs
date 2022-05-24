using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IWordRepository : IBaseDapperRepository<Word>
    {
        Task<PagedResult<WordStatsDTO>> GetWordStatsPagedAsync(Guid userId, uint pageIndex, uint pageSize);

        Task<IEnumerable<WordStatsDTO>> GetWordStatsRecentAsync(Guid userId);
    }
}
