import { AppointmentsService } from '@/modules/appointments/appointments.service';
import { GetAppointment } from '@/modules/appointments/appointments.type';
import { useAuthStore } from '@/modules/auth/auth.store';
import { create } from 'zustand';

interface ClientPanelStore {
    appointments: GetAppointment[];
    fetchAppointments: (userId: string) => Promise<void>;
}
const userId = useAuthStore.getState().userAuthenticated?.id || '';

export const useClientPanelStore = create<ClientPanelStore>((set) => ({
    appointments: [],
    fetchAppointments: async () => {
        const appointments = await AppointmentsService.getAllAppointmentsByUserId(userId);
        set({ appointments });
    },
}));