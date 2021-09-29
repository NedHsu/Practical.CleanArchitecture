export interface CalendarEventState {
    [x: string]: {};
    state: {};
    calendarEvents: CalendarEvent[];
    calendarEvent: CalendarEvent;
    loading: boolean;
    opened: 0 | 1 | 2;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface CalendarEvent {
    id: string;
    name: string;
    code: string;
    description: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
}