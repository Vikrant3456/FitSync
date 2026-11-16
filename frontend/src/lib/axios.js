// import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL: "http://172.20.64.141:5000/api", 
//     withCredentials: true,
// })
import axios from 'axios';

export const axiosInstance = axios.create({
  // Development: point to the backend running on the same laptop
  baseURL:
    import.meta.env.MODE === 'development'
      ? import.meta.env.BACKEND_URL   // resolves to http://localhost:5000/api
      : '/api',
  withCredentials: true,
});