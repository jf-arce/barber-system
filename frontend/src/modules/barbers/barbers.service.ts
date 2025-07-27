import { API_ROUTES } from "@/constants/api-routes";
import axios from "axios";         

export class BarbersService {
    static async getAll() {
        try {
            const response = await axios.get(`${API_ROUTES.BARBERS}`);
            if (response.status !== 200) {
                throw new Error("Error fetching barbers");
            }
            return response.data;
        } catch (error) {
            console.error('Error in BarberService.getAll:', error);
            throw error;
        }
    }
}