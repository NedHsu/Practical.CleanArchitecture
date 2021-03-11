using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Persistence.DapperContext;
using ClassifiedAds.Persistence.Repositories;
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
        public void StockRepositoryTest()
        {
            var dbContext = new DapperContext.StockDbContext("Server=localhost,1433;Database=ClassifiedAds;User Id=sa;Password=Zxc@123456;MultipleActiveResultSets=true");
            var repository = new BaseDapperRepository<Stock>(dbContext, _dateTimeProvider.Object);
            
            var testDto = new Stock { Code = "test", Ex = "otc" };
            repository.Delete(testDto);
            repository.Add(testDto);
            repository.Delete(testDto);
        }
    }
}