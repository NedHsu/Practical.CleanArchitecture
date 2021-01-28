using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using ClassifiedAds.Blazor.Modules.Players.Components;
using ClassifiedAds.Blazor.Modules.Players.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;

namespace ClassifiedAds.Blazor.Modules.Matchs.Pages {
    public partial class Add {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<Add> Logger { get; set; }

        protected PlayerSelector PlayerSelector { get; set; }

        public MatchModel Match { get; set; }

        protected override void OnInitialized() {
            Match = new MatchModel{ 
                Players = new List<PlayerModel>(){
                    new PlayerModel {
                        Name = "Test1",
                        Photo = ""
                    }
                }
            };
        }

        protected async Task Submit() {
            await MatchService.CreateMatch(Match);
        }

        protected async Task SelectPeople() {
            PlayerSelector.Show(Match.Players);
        }

        protected void ConfirmPlayer(List<PlayerModel> players) {
            Match.Players = players;
        }
    }
}