export interface ProductState {
    products: Product[];
    product: Product;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Product {
    name: string;
    code: string;
    description: string;
}