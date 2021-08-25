export interface NotificationState {
    notifications: Notification[];
    notification: Notification;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Notification {
    name: string;
    code: string;
    description: string;
}