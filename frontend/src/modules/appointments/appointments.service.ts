import axios from 'axios';
import { Appointment } from './appointments.type';
import { API_ROUTES } from '@/constants/api-routes';

export class AppintmentsService {

    async create(appointment: Omit<Appointment, 'id' | 'createdAt'>) {
        try {
            const response = await axios.post<Appointment>(API_ROUTES.APPOINTMENTS, appointment, {
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