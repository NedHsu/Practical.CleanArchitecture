using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Blazorise;
using ClassifiedAds.Blazor.Modules.Calendars.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;

namespace ClassifiedAds.Blazor.Modules.Calendars.Components {
    public partial class Scheduler {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        private Modal modalRef;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CurrentDate { get; set; }

        public DateTime[][] Calendars { get; set; }

        public EventModel[][] CalendarEvents { get; set; }

        public Scheduler() {
            SetRange(DateTime.Now.Date);

        }

        public void Hide() {
            modalRef.Hide();
        }

        public void Confirm() {
            modalRef.Hide();
        }

        public void SetRange(DateTime date) {
            CurrentDate = date;
            Calendars = new DateTime[5][];
            StartDate = new DateTime(date.Year, date.Month, 1);
            StartDate = StartDate.AddDays(-(int) (StartDate.DayOfWeek));
            EndDate = StartDate.AddDays(34);

            var tmpDate = StartDate;
            for (var i = 0; i < 5; i++) {
                Calendars[i] = new DateTime[7];
                for (var j = 0; j < 7; j++) {
                    Calendars[i][j] = tmpDate;
                    tmpDate = tmpDate.AddDays(1);
                }
            }
        }
    }
}