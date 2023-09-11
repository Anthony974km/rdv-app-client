import axios from 'axios';
import {API_BASE_URL} from "./Config";

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Intercepteur de requête pour ajouter le token
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur de réponse pour gérer la déconnexion lors d'une erreur 401
apiInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.setItem('isAuthenticated', 'false')
            throw new Error('UnauthorizedError');

        }

        return Promise.reject(error);
    }
);

export default apiInstance;
