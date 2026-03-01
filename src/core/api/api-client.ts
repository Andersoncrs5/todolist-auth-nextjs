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
            const { status, data } = error.response;

            if (status === 401) throw new UnauthorizedError();

            throw new AppError(data.message || "Erro interno no servidor", status);
        }

        throw new AppError("Não foi possível conectar ao servidor", 503);
    }
);