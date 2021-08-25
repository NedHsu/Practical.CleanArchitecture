import { ProductState } from "./modules/product/types";
import { AuthServiceState } from "./modules/authService/types";
//--import

export interface RootState {
    authService: AuthServiceState,
    product: ProductState,
    //--RootState
}