import axios from 'axios';
import { AppError, UnauthorizedError } from "@/core/exceptions/AppError";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                window.location.href = '/auth/login';
                throw new UnauthorizedError();
            }

            if (status >= 500) {
                throw new AppError("The server encountered a problem. Please try again later.", status);
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);