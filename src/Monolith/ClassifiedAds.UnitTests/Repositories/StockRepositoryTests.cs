using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Persistence.DapperContext;
using Moq;
using Xunit;

namespace ClassifiedAds.Persistence.Repositories.Tests
{
    public class StockRepositoryTests
    {
        private Mock<IStockDbContext> _stockDbContext;
        private Mock<IDateTimeProvider> _dateTimeProvider;

        public StockRepositoryTests()
        {
            _stockDbContext = new Mock<IStockDbContext>();
            _dateTimeProvider = new Mock<IDateTimeProvider>();
        }

        [Fact]
        public async void StockRepositoryTest()
        {
            var dbContext = new DapperContext.StockDbContext("Server=localhost,1433;Database=ClassifiedAds;User Id=sa;Password=Zxc@123456;MultipleActiveResultSets=true");
            var repository = new BaseDapperRepository<Stock>(dbContext, _dateTimeProvider.Object);

            var testDto = new Stock { Code = "test", Ex = "otc" };
            await repository.DeleteAsync(testDto);
            await repository.AddAsync(testDto);
            await repository.DeleteAsync(testDto);
        }
    }
}