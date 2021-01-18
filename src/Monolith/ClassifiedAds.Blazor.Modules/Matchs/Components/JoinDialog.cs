using Blazorise;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using System;

namespace ClassifiedAds.Blazor.Modules.Matchs.Components
{
    public partial class JoinDialog
    {
        private Modal modalRef;
        public MatchModel Match { get; set; }

        public void Show(MatchModel match)
        {
            this.Match = match;
            modalRef.Show();
        }

        public void Hide()
        {
            modalRef.Hide();
        }
    }
}