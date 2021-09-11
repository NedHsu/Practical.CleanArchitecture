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
    code: string;
    description: string;
}