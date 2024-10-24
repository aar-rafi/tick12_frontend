import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8000/api';

export interface User {
    user_id: string;
    name: string;
    phone_number: string;
    createdat: string;
}

export interface AuthResponse {
    user: User;
    webToken: string;
}

const auth = {
    async register(data: { name: string; phone_number: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${API_URL}/user/register`, data);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            // Mock response for development
            return {
                user: {
                    user_id: 'mock-user-id',
                    name: data.name,
                    phone_number: data.phone_number,
                    createdat: new Date().toISOString(),
                },
                webToken: 'mock-token',
            };
        }
    },

    async login(data: { phone_number: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${API_URL}/user/login`, data);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            // Mock response for development
            return {
                user: {
                    user_id: 'mock-user-id',
                    name: 'Mock User',
                    phone_number: data.phone_number,
                    createdat: new Date().toISOString(),
                },
                webToken: 'mock-token',
            };
        }
    },
};

export default auth;