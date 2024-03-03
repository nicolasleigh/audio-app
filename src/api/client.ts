import axios, {CreateAxiosDefaults} from 'axios';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';

const baseURL = 'http://192.168.0.103:8080';

const client = axios.create({
  baseURL,
});

type headers = CreateAxiosDefaults<any>['headers'];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  if (!token) return axios.create({baseURL});

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };
  return axios.create({baseURL, headers: defaultHeaders});
};

export default client;
