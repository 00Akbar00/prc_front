import axios from 'axios';

// Create an Axios instance with your base URL
const instance = axios.create({
  baseURL: 'http://localhost:8081', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
