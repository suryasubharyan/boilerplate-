import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export const signup = async (payload) => {
  return axios.post(`${BASE_URL}/auth/signup`, payload);
};

export const signin = async (payload) => {
  return axios.post(`${BASE_URL}/auth/signin`, payload);
};

// export const checkAvailability = async (email) => {
//   return axios.get(`${BASE_URL}/auth/signup.availability-check?email=${email}`);
// };
export const me = (token) =>
  axios.get(`${BASE_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });