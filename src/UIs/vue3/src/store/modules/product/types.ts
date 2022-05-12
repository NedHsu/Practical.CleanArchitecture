export interface ProductState {
    products: Product[];
    product: Product;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Product {
    id?: string;
    name: string;
    code: string;
    description: string;
}