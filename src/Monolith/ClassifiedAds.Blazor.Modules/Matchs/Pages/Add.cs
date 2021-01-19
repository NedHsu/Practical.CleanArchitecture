using ClassifiedAds.Blazor.Modules.Matchs.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Matchs.Pages
{
    public partial class Add
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<Add> Logger { get; set; }

        public MatchModel Match { get; set; }

        protected override void OnInitialized()
        {
            Match = new MatchModel { };
        }
    }
}
