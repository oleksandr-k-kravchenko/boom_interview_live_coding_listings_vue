import axios from "axios";

console.log(import.meta.env.VITE_APP_BASE_API_URL);
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
});

export default http;