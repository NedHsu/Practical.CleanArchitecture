using Blazorise;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using System;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Matchs.Components
{
    public partial class JoinDialog
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        private Modal modalRef;

        public MatchModel Match { get; set; }

        public MatchJoinModel MatchJoin { get; set; } = new MatchJoinModel(){ Number = 1 };

        public void Show(MatchModel match)
        {
            this.Match = match;
            modalRef.Show();
        }

        public void Hide()
        {
            modalRef.Hide();
        }

        public void Confirm()
        {
            modalRef.Hide();
        }

        protected async Task HandleValidSubmit()
        {

        }
    }
}