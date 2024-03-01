import axios from 'axios';

const client = axios.create({
  // baseURL: 'http://192.168.0.103:8080',
  baseURL: 'http://192.168.0.106:8080',
});

export default client;
