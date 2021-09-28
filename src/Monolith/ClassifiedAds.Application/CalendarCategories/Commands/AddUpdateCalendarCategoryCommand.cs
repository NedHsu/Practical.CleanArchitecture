﻿using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.CalendarCategories.Commands
{
    public class AddUpdateCalendarCategoryCommand : ICommand
    {
        public CalendarCategory CalendarCategory { get; set; }
    }

    internal class AddUpdateCalendarCategoryCommandHandler : ICommandHandler<AddUpdateCalendarCategoryCommand>
    {
        private readonly IDapperCrudService<CalendarCategory> _calendarCategoryService;

        public AddUpdateCalendarCategoryCommandHandler(IDapperCrudService<CalendarCategory> calendarCategoryService)
        {
            _calendarCategoryService = calendarCategoryService;
        }

        public void Handle(AddUpdateCalendarCategoryCommand command)
        {
            _calendarCategoryService.AddOrUpdate(command.CalendarCategory);
        }
    }
}