using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockDapperRepository : IBaseDapperRepository<Stock>
    {
        Task<List<Stock>> GetByGroupId(Guid groupId);
        Task<IEnumerable<string>> GetAllIndustryAsync();
        Task<Dictionary<string, string>> GetStocksName(List<string> codes);
        Task<StockFetchDatesDTO> GetStockFetchDates();
        Task<List<StockEPSDTO>> GetEPS(int year, float growthRatio);
        Task<StockExtraDTO> GetExtra(string code);
    }
}
