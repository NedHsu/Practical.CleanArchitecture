using ClassifiedAds.Blazor.Modules.Core.Components;
using ClassifiedAds.Blazor.Modules.Players.Models;
using ClassifiedAds.Blazor.Modules.Players.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Players.Pages
{
    public partial class List
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public PlayerService PlayerService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<List> Logger { get; set; }

        protected ConfirmDialog DeleteDialog { get; set; }

        public List<PlayerModel> Players { get; set; }

        public PlayerModel DeletingPlayer { get; private set; }

        protected override async Task OnInitializedAsync()
        {
            Players = await PlayerService.GetPlayers();
        }

        protected async Task QuickAddPlayer()
        {
            NavManager.NavigateTo("/players/add");
        }

    }
}
