export interface StockState {
    stocks: Stock[];
    stock: Stock;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Stock {
    id: string;
    name: string;
    code: string;
    description: string;
}