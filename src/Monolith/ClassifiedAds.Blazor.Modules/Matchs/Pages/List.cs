using ClassifiedAds.Blazor.Modules.Core.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Components;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Matchs.Pages
{
    public partial class List
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<List> Logger { get; set; }

        protected JoinDialog JoinDialog { get; set; }

        public List<MatchModel> Matchs { get; set; }

        public MatchModel DeletingMatch { get; private set; }

        public MatchFilterModel MatchFilter { get; set; }

        public bool IsMe { get; set; }

        protected override async Task OnInitializedAsync()
        {
            MatchFilter = new MatchFilterModel()
            {
                Pager = new PagerModel
                {
                    PageIndex = 1,
                    PageSize = 10,
                }
            };

            Matchs = new List<MatchModel>();
            await QueryMatchs();
        }

        protected async Task Join(MatchModel match)
        {
            JoinDialog.Show(match);
        }

        protected async Task Add()
        {
            NavManager.NavigateTo("/matchs/add");
        }

        protected async Task QueryMatchs()
        {
            var result = await MatchService.QueryMatchs(MatchFilter);
            if (result.Items?.Count > 0)
            {
                Matchs.AddRange(result.Items);
            }
        }
    }
}