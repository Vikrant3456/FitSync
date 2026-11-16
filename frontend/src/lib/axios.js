// import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL: "http://172.20.64.141:5000/api", 
//     withCredentials: true,
// })
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL   // http://localhost:5000/api
      : "/api",                            // production – same‑origin static assets
  withCredentials: true,
});