import { ProductState } from "./modules/product/types";
import { AuthServiceState } from "./modules/authService/types";
//--import
import { CalendarState } from "./modules/calendar/types";
import { NotificationState } from "./modules/notification/types";
import { CalendarEventState } from "./modules/calendarEvent/types";

export interface RootState {
    authService: AuthServiceState,
    product: ProductState,
    //--RootState
    calendar: CalendarState,
    notification: NotificationState,
    calendarEvent: CalendarEventState,
}