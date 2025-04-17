export type UserRegister = {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone?: string;
    gender: string;
    birthdate: string;
}

export type UserLogin = {
    email: string;
    password: string;
}