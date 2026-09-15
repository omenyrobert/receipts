import axios from "axios";

// Backed by kingdom-heirs-backend's receipts module (see
// ../kingdom-heirs-backend/receipts/). Defaults to the local dev server;
// set VITE_API_BASE_URL to point at the deployed backend instead.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// The backend has no login flow for this tool — every request must carry
// this shared key (checked against RECEIPTS_API_KEY server-side) or it's
// rejected with 401. Set VITE_RECEIPTS_API_KEY to match the server's value.
axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_RECEIPTS_API_KEY;
    if (apiKey) config.headers["x-api-key"] = apiKey;
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
