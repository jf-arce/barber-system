import axios from 'axios';
import { CreateAppointment } from './appointments.type';
import { API_ROUTES } from '@/constants/api-routes';

export class AppointmentsService {

    static async create(createAppointment: CreateAppointment) {
        try {
            const response = await axios.post<CreateAppointment>(API_ROUTES.APPOINTMENTS, createAppointment, {
                withCredentials: true
            });
            if (response.status !== 201 ){
                throw new Error(`Failed to create appointment`);
            }
            return response.data;
        } catch (error) {
            throw new Error(`Error creating appointment: ${error}`);
        }
    }

}