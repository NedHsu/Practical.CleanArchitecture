using Blazorise;
using ClassifiedAds.Blazor.Modules.Calendars.Models;
using ClassifiedAds.Blazor.Modules.Calendars.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Calendars.Components
{
    public partial class Scheduler
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public CalendarService CalendarService { get; set; }

        private Modal modalRef;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CurrentDate { get; set; }

        public DateTime[][] Calendars { get; set; }

        public EventBlockModel[][] CalendarEventBlocks { get; set; }

        protected override async Task OnInitializedAsync()
        {
            SetRange(new DateTime(2021, 2, 1));
            SetCalendars();
            await SetEvents();
        }

        public void Hide()
        {
            modalRef.Hide();
        }

        public void Confirm()
        {
            modalRef.Hide();
        }

        public void SetRange(DateTime date)
        {
            CurrentDate = date;
            StartDate = new DateTime(date.Year, date.Month, 1);
            StartDate = StartDate.AddDays(-(int)(StartDate.DayOfWeek));
            EndDate = StartDate.AddDays(34);
        }

        private async Task SetEvents()
        {
            CalendarEventBlocks = new EventBlockModel[5][];
            var events = (await CalendarService.GetEvents(StartDate, EndDate)).OrderBy(x => x.StartTime);
            foreach (var e in events)
            {
                for (var i = 0; i < Calendars.Length; i++)
                {
                    var startIndex = -1;
                    var beforeStart = false;
                    var endIndex = -1;
                    var afterEnd = false;
                    var sd = Calendars[i].First().Date;
                    var ed = Calendars[i].Last().Date;
                    var diffStart = (e.StartTime - sd).TotalDays;
                    var diffEnd = (e.EndTime - ed.AddDays(1)).TotalDays;

                    if (diffStart < 0)
                    {
                        startIndex = 0;
                        beforeStart = true;
                    }
                    else if (diffStart < 7)
                    {
                        startIndex = (int)Math.Floor(diffStart);
                    }
                    if (startIndex > -1)
                    {
                        if (diffEnd > 0)
                        {
                            afterEnd = true;
                            endIndex = 6;
                        }
                        else if (diffEnd > -7)
                        {
                            endIndex = 7 + (int)Math.Floor(diffEnd);
                        }
                    }

                    if (startIndex > -1 && endIndex > -1)
                    {
                        if (CalendarEventBlocks[i] == null)
                        {
                            CalendarEventBlocks[i] = new EventBlockModel[0];
                        }
                        CalendarEventBlocks[i] = CalendarEventBlocks[i].Append(new EventBlockModel
                        {
                            StartIndex = startIndex,
                            EndIndex = endIndex,
                            BeforeStart = beforeStart,
                            AfterEnd = afterEnd
                        }).ToArray();
                    }
                }
            }
        }

        private void SetCalendars()
        {
            Calendars = new DateTime[5][];
            var tmpDate = StartDate;
            for (var i = 0; i < 5; i++)
            {
                Calendars[i] = new DateTime[7];
                for (var j = 0; j < 7; j++)
                {
                    Calendars[i][j] = tmpDate;
                    tmpDate = tmpDate.AddDays(1);
                }
            }
        }
    }
}