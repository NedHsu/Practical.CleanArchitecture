using ClassifiedAds.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.Models.Calendars
{
    public static class CalendarEventModelMappingConfiguration
    {
        public static IEnumerable<CalendarEventModel> ToDTOs(this IEnumerable<CalendarEvent> entities)
        {
            return entities.Select(x => x.ToDTO());
        }

        public static CalendarEventModel ToDTO(this CalendarEvent entity)
        {
            return new CalendarEventModel
            {
                Id = entity.Id,
            };
        }

        public static CalendarEvent ToEntity(this CalendarEventModel dto)
        {
            return new CalendarEvent
            {
                Id = dto.Id,
            };
        }
    }
}
