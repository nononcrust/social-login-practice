import { STORAGE_KEY } from "@/constants/storage";
import { cookie } from "@/lib/cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = cookie.get(STORAGE_KEY.ACCESS_TOKEN);
  console.log("[Client] access token", accessToken);

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});
