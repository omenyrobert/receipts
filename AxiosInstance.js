import axios from "axios";

// Define the base URL
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Change this to your API endpoint

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (Optional: Add auth tokens, logging, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage or Vuex
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (Handle errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
