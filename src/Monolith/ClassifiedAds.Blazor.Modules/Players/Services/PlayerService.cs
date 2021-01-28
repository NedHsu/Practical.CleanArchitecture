using ClassifiedAds.Blazor.Modules.Core.Services;
using ClassifiedAds.Blazor.Modules.Players.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Players.Services
{
    public class PlayerService : HttpService
    {
        public PlayerService(HttpClient httpClient, ITokenManager tokenManager)
            : base(httpClient, tokenManager)
        {
        }

        public async Task<List<PlayerModel>> GetPlayers()
        {
            var players = await GetAsync<List<PlayerModel>>("api/players");
            return players;
        }

        public async Task<PlayerModel> GetPlayerById(Guid id)
        {
            var player = await GetAsync<PlayerModel>($"api/players/{id}");
            return player;
        }

        public async Task<PlayerModel> CreatePlayer(PlayerModel player)
        {
            var createdPlayer = await PostAsync<PlayerModel>("api/players", player);
            return createdPlayer;
        }

        public async Task<PlayerModel> UpdatePlayer(Guid id, PlayerModel player)
        {
            var updatedPlayer = await PutAsync<PlayerModel>($"api/players/{id}", player);
            return updatedPlayer;
        }

        public async Task DeletePlayer(Guid id)
        {
            await DeleteAsync($"api/players/{id}");
        }
    }
}
