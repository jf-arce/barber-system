// const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5026/api';
// const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/api'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5026/api';

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        REFRESH_TOKEN: `${API_BASE_URL}/auth/refreshToken`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
    },
    APPOINTMENTS: `${API_BASE_URL}/appointments`,
    SERVICES: `${API_BASE_URL}/services`,
    BARBERS: `${API_BASE_URL}/barbers`,
};