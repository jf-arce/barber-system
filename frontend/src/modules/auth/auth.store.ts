import { create } from 'zustand';
import { UserAuthenticated } from './auth.types';

interface AuthStore {
    userAuthenticated: UserAuthenticated | null;
    isLoading: boolean;
    error: string | null;
    setUserAuthenticated: (user: UserAuthenticated | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    userAuthenticated: null,
    isLoading: false,
    error: null,

    setUserAuthenticated: (user) => set({ userAuthenticated: user }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
}))