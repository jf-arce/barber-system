import { cookies } from 'next/headers';

// Leemos las cookies del navegador para usarlas en el servidor
// Son las cookies que el navegador incluye en la request que Next.js recibe
export const getRequestCookies = async () => (await cookies()).toString();