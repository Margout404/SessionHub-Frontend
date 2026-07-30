import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const publicEndpoints = [
    "/auth/login",
    "/auth/register",
  ];

  const isPublicEndpoint = publicEndpoints.some(
    (endpoint) => config.url?.startsWith(endpoint),
  );

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;