import axios from 'axios';
import { CreateAppointment, PostBarbersAvailability, GetBarbersAvailability } from './appointments.type';
import { API_ROUTES } from '@/core/constants/api-routes';

export class AppointmentsService {

    static async create(createAppointment: CreateAppointment) {
        try {
            const response = await axios.post<CreateAppointment>(API_ROUTES.APPOINTMENTS, createAppointment, {
                withCredentials: true
            });
            if (response.status !== 201 ){
                throw new Error(`Failed to create appointment: ${response.data}`);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
            throw new Error(`Error creating appointment: ${error}`);
        }
    }

    static async checkBarbersAvailability(checkBarbersAvailabilityDto: PostBarbersAvailability): Promise<GetBarbersAvailability> {
        try {
            const response = await axios.post(`${API_ROUTES.APPOINTMENTS}/barbers-availability`, checkBarbersAvailabilityDto, {
                withCredentials: true
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch barber's hours availability: ${response.data}`);
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return {} as GetBarbersAvailability;
        }
    }

}