import { API_ROUTES } from "@/core/constants/api-routes";
import { UserLogin, UserRegister } from "./auth.types";

export class AuthService {
    
    static async login(userLogin: UserLogin){
        try {
            const res = await fetch(API_ROUTES.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userLogin)
            });
    
            if (res.status === 401 || res.status === 400) {
                throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
            }

            if (!res.ok) {
                throw new Error('Error al iniciar sesión, por favor intenta de nuevo más tarde.');
            }
    
            return res.json();
        } catch (error) {
            console.error('Error en AuthService.login:', error);
            throw error;
        }
    }

    static async register(userRegister: UserRegister){
        try {
            const res = await fetch(API_ROUTES.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userRegister)
            });
    
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }
    
            return data;
        } catch (error) {
            console.error('Error en AuthService.register:', error);
            throw error;
        }
    }
}