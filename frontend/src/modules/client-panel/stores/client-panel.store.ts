import { AppointmentsService } from '@/modules/appointments/appointments.service';
import { GetAppointment } from '@/modules/appointments/appointments.type';
import { create } from 'zustand';

interface ClientPanelStore {
    appointments: GetAppointment[];
    isLoading: boolean;
    fetchAppointments: (userId: string) => Promise<void>;
    reset: () => void;
}

export const useClientPanelStore = create<ClientPanelStore>((set) => ({
    appointments: [],
    isLoading: false,
    fetchAppointments: async (userId: string) => {
        set({ isLoading: true });
        const appointments = await AppointmentsService.getAllAppointmentsByUserId(userId);
        set({ appointments, isLoading: false });
    },
    reset: () => set({ appointments: [], isLoading: false }),
}));