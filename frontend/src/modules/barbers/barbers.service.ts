import axios from "axios";         
import { API_ROUTES } from "@/core/constants/api-routes";
import { GetBarber } from "./barbers.type";
// import { getRequestCookies } from "@/core/utils/getRequestCookies";

export class BarbersService {
    static async getAll() : Promise<GetBarber[]> {
        try {
            const response = await axios.get(`${API_ROUTES.BARBERS}`, {
                // headers: {
                //     cookie: await getRequestCookies()
                // },
                withCredentials: true,
            });
            if (response.status !== 200) {
                throw new Error(`Error fetching barbers: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch barbers: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}