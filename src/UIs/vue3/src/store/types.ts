import { ProductState } from "./modules/product/types";

export interface AuthService {

}

export interface RootState {
    authService: AuthService,
    product: ProductState,
}