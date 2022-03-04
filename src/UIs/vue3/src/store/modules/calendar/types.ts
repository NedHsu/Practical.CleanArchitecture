export interface CalendarState {
    calendarCategories: any;
    calendars: Calendar[];
    calendar: Calendar;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Calendar {
    id: string;
    name: string;
    dragBgColor: string;
    categoryId: string;
    bgColor: string;
    borderColor: string;
    color: string;
    categoryName: string;
}