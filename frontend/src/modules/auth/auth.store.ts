import { create } from 'zustand';
import { UserAuthenticated } from './auth.types';
import { API_ROUTES } from '@/constants/api-routes';

interface AuthStore {
    userAuthenticated: UserAuthenticated | null;
    isLoading: boolean;
    error: string | null;
    setUserAuthenticated: (user: UserAuthenticated | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    userAuthenticated: null,
    isLoading: false,
    error: null,

    setUserAuthenticated: (user) => set({ userAuthenticated: user }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    logout: async () => {
        try {
            await fetch(API_ROUTES.AUTH.LOGOUT, { method: 'POST', credentials: 'include' });
            set({ userAuthenticated: null });
        } catch (e) {
            console.error('Error al hacer logout:', e);
        }
    },
    refreshToken: async () => {
        try {
            const response = await fetch(API_ROUTES.AUTH.REFRESH_TOKEN, { method: 'POST', credentials: 'include' });
            
            if (response.status === 401) {
                set({ userAuthenticated: null });
                return;
            }

            if (!response.ok) throw new Error('Failed to refresh token');
            
            const payload = await response.json();
            
            set({ userAuthenticated: payload });
        } catch (error) {
            console.error('Error al refrescar el token:', error);
        }
    }
}))