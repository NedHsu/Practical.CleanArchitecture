export interface ProfileState {
    profiles: Profile[];
    profile: Profile;
    loading: boolean;
    saved: boolean;
    deleted: boolean;
    error?: any;
}

export interface Profile {
    id: string;
    name: string;
    code: string;
    description: string;
}