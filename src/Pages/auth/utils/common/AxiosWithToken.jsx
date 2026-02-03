import axios from 'axios';
import { apiurl } from './Common';

// Function to create axios instance with token attached
export const axiosWithToken = () => {
  const token = localStorage.getItem('token'); // get stored JWT

  return axios.create({
    baseURL: apiurl,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
