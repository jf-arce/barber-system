import { API_ROUTES } from "@/constants/api-routes";

export class AuthService {
    
    static async login({email, password}: { email: string; password: string }){
        try {
            const res = await fetch(API_ROUTES.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });
    
            if (!res.ok) {
                throw new Error('Error al iniciar sesión');
            }
    
            return res.json();
        } catch (error) {
            console.error('Error en AuthService.login:', error);
            throw error;
        }
    }
}