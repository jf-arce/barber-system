import { GetService } from './services.type';
import { API_ROUTES } from '@/core/constants/api-routes';
import axios from 'axios';
// import { getRequestCookies } from '@/core/utils/getRequestCookies';

export class ServicesService {
    static async getAll() : Promise<GetService[]> {
        try {
            const response = await axios.get<GetService[]>(API_ROUTES.SERVICES, {
                // headers: {
                //     cookie: await getRequestCookies()
                // },
                withCredentials: true,
            });
            if (response.status !== 200) {
                throw new Error(`Error fetching services: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch services: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}