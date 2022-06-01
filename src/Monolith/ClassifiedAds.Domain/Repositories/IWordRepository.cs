using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IWordRepository : IBaseDapperRepository<Word>
    {
        Task<PagedResult<WordStatsDTO>> GetWordStatsPagedAsync(Guid userId, uint pageIndex, uint pageSize, uint intervalMins = 30);

        Task<IEnumerable<WordStatsDTO>> GetWordStatsRecentAsync(Guid userId);

        Task<PagedResult<WordStatsDTO>> GetWordStatsRecentPagedAsync(Guid userId, uint pageIndex, uint pageSize, bool isFav);
    }
}
