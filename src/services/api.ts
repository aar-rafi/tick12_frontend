import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trainService = {
  searchTrains: async (params: { from: string; to: string; date: string }) => {
    try {
      const response = await api.get('/trains/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching trains:', error);
      throw error;
    }
  },

  getAvailableSeats: async (trainId: string, date: string) => {
    try {
      const response = await api.get(`/trains/${trainId}/seats`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting available seats:', error);
      throw error;
    }
  },

  bookSeats: async (trainId: string, seats: string[], date: string) => {
    try {
      const response = await api.post(`/trains/${trainId}/book`, {
        seats,
        date,
      });
      return response.data;
    } catch (error) {
      console.error('Error booking seats:', error);
      throw error;
    }
  },
};