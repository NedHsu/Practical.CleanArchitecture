﻿using ClassifiedAds.Blazor.Modules.Core.Services;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Matchs.Services
{
    public class MatchService : HttpService
    {
        public MatchService(HttpClient httpClient, ITokenManager tokenManager)
            : base(httpClient, tokenManager)
        {
        }

        public async Task<List<MatchModel>> GetMatchs()
        {
            var matchs = await GetAsync<List<MatchModel>>("api/matchs");
            return matchs;
        }

        public async Task<MatchModel> GetMatchById(Guid id)
        {
            var match = await GetAsync<MatchModel>($"api/matchs/{id}");
            return match;
        }

        public async Task<MatchModel> CreateMatch(MatchModel match)
        {
            var createdMatch = await PostAsync<MatchModel>("api/matchs", match);
            return createdMatch;
        }

        public async Task<MatchModel> UpdateMatch(Guid id, MatchModel match)
        {
            var updatedMatch = await PutAsync<MatchModel>($"api/matchs/{id}", match);
            return updatedMatch;
        }

        public async Task DeleteMatch(Guid id)
        {
            await DeleteAsync($"api/matchs/{id}");
        }
    }
}