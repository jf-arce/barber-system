export type GetBarber = {
    id: string;
    name: string;
    surname: string;
    email: string;
    gender: string;
    role: string;
    birthdate: string;
    phone: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
    services: GetBarberService[];
    socialNetworks: GetBarberSocialNetwork[];
}

type GetBarberService = {
    id: number;
    name: string;
}

type GetBarberSocialNetwork = {
    name: string;
    url: string;
}