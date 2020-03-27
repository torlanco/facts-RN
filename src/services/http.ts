import axios from 'axios';
import { LocalStorageService } from './localstorageService';

const localStorageService = LocalStorageService.getService();

const appAxios = axios.create({
  baseURL: 'https://facts-cloud.herokuapp.com/',
  timeout: 2 * 60 * 1000, // 2 min
})

appAxios.interceptors.request.use(
  async (config) => {
   const token = await localStorageService.getAccessToken();
   if (token) {
       config.headers['Authorization'] = 'Bearer ' + token;
   }
   return config;
},
error => {
   Promise.reject(error)
});

export default appAxios;
