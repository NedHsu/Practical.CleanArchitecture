export interface CalendarState {
    calendars: Calendar[];
    calendar: Calendar;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Calendar {
    name: string;
    code: string;
    description: string;
}