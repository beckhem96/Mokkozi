//api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
});

export const apis = {
  get: () => api.get('/posts'), //지금은 단순한 get요청
  login: (data) => api.post('/', data),
  // 코드 추가시...
};
