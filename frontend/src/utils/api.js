import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000'
});
export const fetchCurrentWeather = (city) =>
  api.get('/api/weather/current', { params: { city } }).then(r => r.data);
export const fetchForecast = (city) =>
  api.get('/api/weather/forecast', { params: { city } }).then(r => r.data);
