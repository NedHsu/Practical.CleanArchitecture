export interface PaymentState {
    payments: Payment[];
    payment: Payment;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
    checkoutKeys: string[];
}

export interface Payment {
    id: string;
    errors: Array<string>;
    url: string;
    data: object;
}