import axios from "axios";

export const API_CALL_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
