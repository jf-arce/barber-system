import axios from 'axios';
import { CreateAppointment, PostBarbersAvailability, GetBarbersAvailability, GetAppointment } from './appointments.type';
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
            return {
                date: "",
                availableSlots: []
            } as GetBarbersAvailability;
        }
    }

    static async getAllAppointmentsByUserId(userId: string): Promise<GetAppointment[]> {
        try {
            const response = await axios.get<GetAppointment[]>(`${API_ROUTES.APPOINTMENTS}/user/${userId}`, {
                withCredentials: true
            });

            if (response.status !== 200) {
                throw new Error(`Failed to fetch appointments: ${response.data}`);
            }
            
            return response.data;
        } catch (error) {
            console.error("Error fetching appointments:", error);
            return [];
        }
    }

    static async cancelAppointment(appointmentId: number): Promise<void> {
        try {
            const response = await axios.patch(`${API_ROUTES.APPOINTMENTS}/${appointmentId}/cancel`, {}, {
                withCredentials: true
            });
            if (response.status !== 200) {
                throw new Error(`Failed to cancel appointment: ${response.data}`);
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
            throw new Error(`Error canceling appointment: ${error}`);
        }
    }

    static async rescheduleAppointment(data: { id: number, newDateTime: string }): Promise<void> {
        try {
            const response = await axios.patch(`${API_ROUTES.APPOINTMENTS}/${data.id}/reschedule`,
            { 
                newDateTime: data.newDateTime 
            }, 
            {
                withCredentials: true
            });
            if (response.status !== 200) {
                throw new Error(`Failed to reschedule appointment: ${response.data}`);
            }
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
            throw new Error(`Error rescheduling appointment: ${error}`);
        }
    }
}