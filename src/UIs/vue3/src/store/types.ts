import { ProductState } from "./modules/product/types";
import { AuthServiceState } from "./modules/authService/types";
//--import
import { AwesomePageState } from "./modules/awesomePage/types";
import { CalendarState } from "./modules/calendar/types";
import { NotificationState } from "./modules/notification/types";
import { CalendarEventState } from "./modules/calendarEvent/types";

export interface RootState {
    authService: AuthServiceState,
    product: ProductState,
    //--RootState
    awesomePage: AwesomePageState,
    calendar: CalendarState,
    notification: NotificationState,
    calendarEvent: CalendarEventState,
}