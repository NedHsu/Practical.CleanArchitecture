using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.Domain.Identity;
using Moq;
using System;
using System.Net.Http;
using Xunit;

namespace ClassifiedAds.UnitTests.Weathers.Services
{
    public class WeatherServiceTests
    {
        private MockRepository mockRepository;

        private Mock<HttpClient> mockHttpClient;
        private HttpClient httpClient;
        private Mock<WeatherServiceConfigs> mockWeatherServiceConfigs;
        private Mock<ICurrentUser> mockCurrentUser;

        public WeatherServiceTests()
        {
            this.mockRepository = new MockRepository(MockBehavior.Strict);

            this.mockHttpClient = this.mockRepository.Create<HttpClient>();
            this.httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://opendata.cwb.gov.tw/api"),
            };

            this.mockWeatherServiceConfigs = this.mockRepository.Create<WeatherServiceConfigs>();
            this.mockWeatherServiceConfigs.Setup(x => x.Key).Returns("CWB-D72F0129-BC81-4E7D-8073-85219CB12EB0");

            this.mockCurrentUser = this.mockRepository.Create<ICurrentUser>();
        }

        private WeatherService CreateService()
        {
            return new WeatherService(
                this.httpClient,
                this.mockWeatherServiceConfigs.Object,
                this.mockCurrentUser.Object);
        }

        [Fact]
        public void GetAlarm_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetWeatherAlarmQuery query = null;

            // Act
            var result = service.GetAlarm(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetAll_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();

            // Act
            var result = service.GetAll();

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetByCountry_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetCountyWeatherQuery query = null;

            // Act
            var result = service.GetByCountry(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetEarthquake_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetEarthquakerQuery query = null;

            // Act
            var result = service.GetEarthquake(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetRecent_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetRecentQuery query = null;

            // Act
            var result = service.GetRecent(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetTida_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetTidalQuery query = null;

            // Act
            var result = service.GetTida(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public void GetParamters_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            GetTidalQuery query = null;

            // Act
            var result = service.GetParamters(
                query);

            // Assert
            Assert.True(false);
            this.mockRepository.VerifyAll();
        }
    }
}
