export interface WordState {
    words: Word[];
    word: Word;
    wordStatsPaged: WordStatsPaged;
    recentWords: Word[];
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

export interface WordStats {
    id: string;
    text: string;
    description: string;
    partOfSpeach: string;
    wrong: number;
    correct: number;
}

export interface WordStatsPaged {
    items: WordStats[];
    total: number;
    pageIndex: number;
    totalCount: number;
    totalPages: number;
}