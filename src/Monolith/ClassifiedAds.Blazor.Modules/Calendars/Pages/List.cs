using ClassifiedAds.Blazor.Modules.Calendars.Models;
using ClassifiedAds.Blazor.Modules.Calendars.Services;
using ClassifiedAds.Blazor.Modules.Core.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Calendars.Pages
{
    public partial class List
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public CalendarService CalendarService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<List> Logger { get; set; }

        protected ConfirmDialog DeleteDialog { get; set; }

        public List<CalendarModel> Calendars { get; set; }

        public CalendarModel DeletingCalendar { get; private set; }

        protected override async Task OnInitializedAsync()
        {
            // Calendars = await CalendarService.GetCalendars();
        }

        protected async Task QuickAddCalendar()
        {
            NavManager.NavigateTo("/calendars/add");
        }

    }
}
