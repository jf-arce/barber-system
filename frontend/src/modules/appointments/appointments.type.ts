export enum AppointmentStatus {
    CONFIRMED = "Confirmed",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
}

type AppointmentServices = {
    appointmentId: number;
    serviceId: number;
    barberId: number;
};

export type Appointment = {
    id: number;
    dateTime: string;
    createdAt: string;
    status: AppointmentStatus;
    userId: string;
    services: AppointmentServices[];
};

export type CreateAppointment = {
    dateTime: string;
    userId: string;
    services: {
        serviceId: number;
        barberId: string | null;
    }[];
    assignBarberAutomatically: boolean;
};

export type GetAppointment = {
    id: number;
    dateTime: string; // ISO 8601 format
    createdAt: string; // ISO 8601 format
    status: AppointmentStatus;
    user: UserAppointment;
    services: GetAppointmentServices[];
};

type GetAppointmentServices = {
    service: ServiceAppointment;
    barber: BarberAppointment;
};

export type ServiceAppointment = {
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
};

export type ServicesWithBarber = {
    serviceId: number;
    barberId: string;
};

export type GetBarbersAvailability = {
    date: string; // ISO 8601 format
    availableSlots: {
        start: string;
        end: string;
    }[];
};