import axios from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_API

export default axios.create({
  baseURL: baseUrl,
  headers: {
    withCredentials: true,
    Accept: "application/json",
  },
});
