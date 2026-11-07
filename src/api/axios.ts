import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "../store";
import { logout } from "../store/slices/tokenSlice";
import { deleteUserRole } from "../store/slices/roleSlice";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token } = store.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(deleteUserRole());
    }
    return Promise.reject(error);
  },
);

export default api;
