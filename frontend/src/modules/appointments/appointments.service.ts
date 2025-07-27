import axios from 'axios';
import { NewAppointment } from './appointments.type';
import { API_ROUTES } from '@/constants/api-routes';

export class AppointmentsService {

    static async create(newAppointment: NewAppointment) {
        try {
            const response = await axios.post<NewAppointment>(API_ROUTES.APPOINTMENTS, newAppointment, {
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