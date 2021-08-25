import { ProductState } from "./modules/product/types";
import { AuthServiceState } from "./modules/authService/types";
//--import
import { CalendarEventState } from "./modules/calendarEvent/types";

export interface RootState {
    authService: AuthServiceState,
    product: ProductState,
    //--RootState
    calendarEvent: CalendarEventState,
}