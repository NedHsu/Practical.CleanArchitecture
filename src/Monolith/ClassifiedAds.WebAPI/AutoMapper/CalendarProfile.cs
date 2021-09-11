using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Calendars;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class CalendarProfile : Profile
    {
        public CalendarProfile()
        {
            CreateMap<CalendarEvent, CalendarEventModel>()
                .ForMember(x => x.Start, opt => opt.MapFrom(src => src.StartTime))
                .ForMember(x => x.End, opt => opt.MapFrom(src => src.EndTime))
                ;
            CreateMap<CalendarEventModel, CalendarEvent>()
                .ForMember(x => x.StartTime, opt => opt.MapFrom(src => src.Start))
                .ForMember(x => x.EndTime, opt => opt.MapFrom(src => src.End))
                ;
            CreateMap<CalendarModel, Calendar>();
            CreateMap<Calendar, CalendarModel>()
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(src => src.Category == null ? string.Empty : src.Category.Name))
                ;
            CreateMap<CalendarCategory, CalendarCategoryModel>();
            CreateMap<CalendarCategoryModel, CalendarCategory>();
        }
    }
}
