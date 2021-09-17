export interface AwesomePageState {
    awesomePages: AwesomePage[];
    awesomePage: AwesomePage;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface AwesomePage {
    id: string;
    name: string;
    code: string;
    description: string;
}