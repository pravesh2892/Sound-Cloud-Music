import axios from 'axios';
import { BASE_URL, PROJECT_ID } from './utils/constant';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        projectId: PROJECT_ID,
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const addRemoveToWatchlist = async (songId) => {
    try {
        const data = await axios.patch(`/favorites/like`, { songId: songId });
        console.log(data);
        return data.data;
    } catch (error) {
        console.log('add to watchlist error => ', error);
        return {};
    }
}

const getWatchlist = async () => {
    try {
        const response = await axios.get(`/favorites/like`);
        return response.data.data.shows;
    } catch (error) {
        console.log('watchlist error => ', error);
        return [];
    }
}

export const fetchDataFromApi = async (url, options = {}) => {
    try {
        const response = await api.get(url, options);
        return response.data;
      } catch (error) {
        console.log(`Error fetching data from API: ${error}`);
        return null;
      }
  };

export { addRemoveToWatchlist, getWatchlist };

export default api;