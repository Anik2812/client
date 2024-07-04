import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the baseURL to match your server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
