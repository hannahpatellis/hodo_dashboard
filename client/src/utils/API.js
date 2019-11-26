import axios from "axios";

export default {
  login: userData =>
    axios.post('/auth/login', userData),
  signUp: userData =>
    axios.post('/auth/signup', userData),
  dashboard: () =>
    axios.get('/public/points'),
  challenges: () =>
    axios.get('/public/challenges'),
  points: (house, points, token) =>
    axios.put('/api/points', { house: house, points: points }, { headers: { Authorization: `bearer ${token}` } }),
  owl: (house, token) =>
    axios.put('/api/giveowl', { house: house }, { headers: { Authorization: `bearer ${token}` } }),
  weekreset: (token) =>
    axios.put('/api/weekreset', { }, { headers: { Authorization: `bearer ${token}` } })
};
