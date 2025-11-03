import axios from 'axios';
const BASE = 'http://localhost:5000/api/v1/code-verification';

export const requestVerification = (payload) =>
  axios.post(`${BASE}/request`, payload); // e.g. { email, via: 'code', purpose: 'PRE_SIGNUP' }

export const verifyCode = (payload) =>
  axios.post(`${BASE}/verify`, payload); // e.g. { _codeVerification, code }
