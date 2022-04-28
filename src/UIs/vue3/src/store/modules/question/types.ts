export interface QuestionState {
    questions: Question[];
    question: Question;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Question {
    id: string;
    name: string;
    code: string;
    description: string;
}