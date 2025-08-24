export enum AppointmentStatus {
    CONFIRMED = "Confirmado",
    CANCELLED = "Cancelado",
    COMPLETED = "Completado",
}

type AppointmentDetails = {
    appointmentId: number;
    serviceId: number;
    barberId: number;
    startDateTime: string;
    endDateTime: string;
};

export type Appointment = {
    id: number;
    createdAt: string;
    status: AppointmentStatus;
    userId: string;
    appointmentDetails: AppointmentDetails[];
};

export type CreateAppointment = {
    startDateTime: string;
    userId: string;
    appointmentDetails: {
        serviceId: number;
        barberId: string | null;
    }[];
    assignBarberAutomatically: boolean;
};

export type GetAppointment = {
    id: number;
    createdAt: string; // ISO 8601 format
    status: AppointmentStatus;
    user: UserAppointment;
    appointmentDetails: GetAppointmentDetails[];
};

type GetAppointmentDetails = {
    startDateTime: string; // ISO 8601 format
    endDateTime: string; // ISO 8601 format
    service: ServiceAppointment;
    barber: BarberAppointment;
};

export type ServiceAppointment = {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
};

type BarberAppointment = {
    id: number;
    name: string;
    surname: string;
};

type UserAppointment = {
    id: string;
    name: string;
    surname: string;
};


export type PostBarbersAvailability = {
    date: string; // ISO 8601 format
    servicesWithBarberDto: ServicesWithBarber[];
    assignBarberAutomatically: boolean;
};

export type ServicesWithBarber = {
    serviceId: number;
    barberId: string | null;
};

export type GetBarbersAvailability = {
    date: string; // ISO 8601 format
    availableSlots: {
        start: string;
        end: string;
    }[];
};