const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5026/api';

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    },
};