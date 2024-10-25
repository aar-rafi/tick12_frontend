import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TRAIN_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'text/plain',
  },
});

//send to irtiaz 
export const trainService = {
  searchTrains: async (params: { from_station_name: string; to_station_name: string; date: string }) => {
    console.log('searchTrains', params);
    try {
      const response = await api.post('/api/trains/get', params );
      console.log('response_train', response.data);
      // const { date, ...paramsWithoutDate } = params;
      // console.log('pr', paramsWithoutDate);
      const paramsWithoutDate ={
        from_station_name:params.from_station_name,
        to_station_name:params.to_station_name
      }
      console.log('pr', paramsWithoutDate);
      const r_price = await api.post(`${import.meta.env.VITE_PRICE_API_URL}/api/price/stationids`,  paramsWithoutDate );
      

      return {...response.data, price: r_price.data.price};
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