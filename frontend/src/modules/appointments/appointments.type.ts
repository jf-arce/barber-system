export enum AppointmentStatus {
    CONFIRMED = "Confirmed",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
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