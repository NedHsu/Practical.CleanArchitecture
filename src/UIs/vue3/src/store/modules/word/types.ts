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
    text: string;
    description: string;
    partOfSpeach: string;
    action: string;
}