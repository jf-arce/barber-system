import axios from 'axios';
import { Service } from './services.type';
import { API_ROUTES } from '@/constants/api-routes';

export class BarberServicesService {

    static async getAll(): Promise<Service[]> {
        try {
            const response = await axios.get<Service[]>(API_ROUTES.SERVICES, {
                withCredentials: true
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch services`);
            }

            return response.data;
        } catch (error) {
            throw new Error(`Error fetching services: ${error}`);
        }
    }
}