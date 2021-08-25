export interface CalendarEventState {
    calendarEvents: CalendarEvent[];
    calendarEvent: CalendarEvent;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface CalendarEvent {
    name: string;
    code: string;
    description: string;
}