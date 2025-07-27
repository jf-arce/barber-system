export type Appointment = {
    id: number;
    datetime: string;
    createdAt: string;
    status: string;
    serviceId: number;
    userId: string;
    barberId: string;
}

export type NewAppointment = Omit<Appointment, 'id' | 'createdAt' | 'status'>;