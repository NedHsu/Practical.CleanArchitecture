using ClassifiedAds.Blazor.Modules.Core.Services;
using ClassifiedAds.Blazor.Modules.Calendars.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Calendars.Services
{
    public class CalendarService : HttpService
    {
        public CalendarService(HttpClient httpClient, ITokenManager tokenManager)
            : base(httpClient, tokenManager)
        {
        }

        public async Task<List<CalendarModel>> GetCalendars()
        {
            var calendars = await GetAsync<List<CalendarModel>>("api/calendars");
            return calendars;
        }

        public async Task<CalendarModel> GetCalendarById(Guid id)
        {
            var calendar = await GetAsync<CalendarModel>($"api/calendars/{id}");
            return calendar;
        }

        public async Task<CalendarModel> CreateCalendar(CalendarModel calendar)
        {
            var createdCalendar = await PostAsync<CalendarModel>("api/calendars", calendar);
            return createdCalendar;
        }

        public async Task<CalendarModel> UpdateCalendar(Guid id, CalendarModel calendar)
        {
            var updatedCalendar = await PutAsync<CalendarModel>($"api/calendars/{id}", calendar);
            return updatedCalendar;
        }

        public async Task DeleteCalendar(Guid id)
        {
            await DeleteAsync($"api/calendars/{id}");
        }
    }
}
