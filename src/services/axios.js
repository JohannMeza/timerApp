import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  header: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance;