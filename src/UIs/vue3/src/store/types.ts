import { ProductState } from "./modules/product/types";
import { AuthServiceState } from "./modules/authService/types";
//--import
import { StockState } from "./modules/stock/types";
import { AwesomePageState } from "./modules/awesomePage/types";
import { CalendarState } from "./modules/calendar/types";
import { NotificationState } from "./modules/notification/types";
import { CalendarEventState } from "./modules/calendarEvent/types";

export interface RootState {
    authService: AuthServiceState,
    product: ProductState,
    //--RootState
    stock: StockState,
    awesomePage: AwesomePageState,
    calendar: CalendarState,
    notification: NotificationState,
    calendarEvent: CalendarEventState,
}