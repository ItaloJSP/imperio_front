import axios from 'axios';

const api = axios.create({
  baseURL: 'https://loja-production-f7e7.up.railway.app',
});


export default api;
