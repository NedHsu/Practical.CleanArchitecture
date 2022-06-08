export interface PaymentState {
    payments: Payment[];
    payment: Payment;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Payment {
    id: string;
    name: string;
    code: string;
    description: string;
}