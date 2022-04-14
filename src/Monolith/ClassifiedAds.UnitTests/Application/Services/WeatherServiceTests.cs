using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.Application.Weathers.Services;
using Moq;
using Xunit;

namespace ClassifiedAds.UnitTests.Application.Services
{
    public class WeatherServiceTests
    {
        private MockRepository mockRepository;

        private WeatherServiceConfigs mockWeatherServiceConfigs;

        public WeatherServiceTests()
        {
            this.mockRepository = new MockRepository(MockBehavior.Strict);

            this.mockWeatherServiceConfigs = new WeatherServiceConfigs() { Key = "CWB-D72F0129-BC81-4E7D-8073-85219CB12EB0", Timeout = 60, Server = "https://opendata.cwb.gov.tw" };
        }

        private WeatherService CreateService()
        {
            return new WeatherService(
                this.mockWeatherServiceConfigs);
        }

        [Fact]
        public async void GetAlarm_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherAlarmQuery query = new GetWeatherAlarmQuery()
            {
                Limit = 1,
                Offset = 1,
                LocationName = new string[] { "花蓮縣", "臺東縣", },
                Phenomena = new string[] { "大豪雨", "超大豪雨", "陸上強風", },
            };

            // Act
            var result = await service.GetAlarm(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async void GetByCountry_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherCountyWeatherQuery query = new GetWeatherCountyWeatherQuery()
            {
                Country = "F-D0047-087",
                ElementName = new string[] { "MinCI", "MaxAT", "MaxCI", "MinT", "UVI", "MinAT", "MaxT", "WS", "WD", "Td", "PoP12h", "T", "RH", "Wx", "WeatherDescription" },
            };

            // Act
            var result = await service.GetByCountry(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async void GetEarthquake_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherEarthquakeQuery query = new GetWeatherEarthquakeQuery
            {
            };

            // Act
            var result = await service.GetEarthquake(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async void GetRecent_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherRecentQuery query = new GetWeatherRecentQuery
            {
            };

            // Act
            var result = await service.GetRecent(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async void GetTida_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherTidalQuery query = new GetWeatherTidalQuery
            {
            };

            // Act
            var result = await service.GetTida(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async void GetObservation_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherObservationQuery query = new GetWeatherObservationQuery
            {
            };

            // Act
            var result = await service.GetObservation(
                query);

            // Assert
            Assert.True(result.Success == "true");
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetParamters_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherTidalQuery query = new GetWeatherTidalQuery()
            {
            };

            // Act
            var result = service.ToParamters(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }
    }
}
