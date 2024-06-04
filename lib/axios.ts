import axios from "axios";
import { auth } from "./auth";

const BASE_URL = process.env.BACKEND_API;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuthServer = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
axiosAuthServer.interceptors.request.use(
  async (config) => {
    // return ()=>{
    //     axiosAuth.interceptors.request.eject(requestIntercept)
    // }
    // Modify the request config here (add headers, authentication tokens)
    const session = await auth();
    const accessToken =
      session && session.access_token ? session.access_token : null;

    if (accessToken !== null && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor
