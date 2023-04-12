import axios from "axios";

export const client = axios.create({
  baseURL: process.env.BACKEND_URL || "https://sell-it.onrender.com/api/v1",
});
