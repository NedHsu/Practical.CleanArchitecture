import { ProductState } from "./modules/product/types";
//--import
export interface AuthService {

}

export interface RootState {
    authService: AuthService,
    product: ProductState,
    //--RootState
}