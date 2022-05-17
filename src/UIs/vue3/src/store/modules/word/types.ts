export interface WordState {
    words: Word[];
    word: Word;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Word {
    id: string;
    name: string;
    code: string;
    description: string;
}