export interface WordState {
    words: Word[];
    word: Word;
    wordIndex: number;
    wordStatsPaged: WordStatsPaged;
    recentWords: WordStats[];
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
    wordId: string;
    text: string;
    description: string;
    partOfSpeach: string;
    wrong: number;
    correct: number;
    ok?: boolean;
}

export interface WordStatsPaged {
    items: WordStats[];
    total: number;
    pageIndex: number;
    totalCount: number;
    totalPages: number;
}