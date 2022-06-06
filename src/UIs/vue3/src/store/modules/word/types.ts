export interface WordState {
    words: Word[];
    word: Word;
    wordCustom: WordCustom;
    wordIndex: number;
    wordStatsPaged: WordStatsPaged;
    recentWords: WordStats[];
    loading: boolean;
    wordsLoading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
    correct: number;
    wrong: number;
    editting: boolean;
}

export interface Word {
    id: string;
    text: string;
    description: string;
    partOfSpeech: string;
    action?: string;
}

export interface WordCustom {
    id?: string;
    wordId?: string;
    text: string;
    description: string;
    partOfSpeech: string;
}

export interface WordStats {
    id: string;
    wordId: string;
    customId?: string ;
    text: string;
    description: string;
    sentence: string;
    sentenceArr: string[];
    partOfSpeech: string;
    wrong: number;
    correct: number;
    ok?: boolean;
    isFav: boolean;
}

export interface WordStatsPaged {
    items: WordStats[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}