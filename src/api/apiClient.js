import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINTS } from "./endpoints";

const apiClient = axios.create({
  baseURL: "http://10.182.240.137:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // زيادة الـ timeout لـ 30 ثانية
});

apiClient.interceptors.request.use(
  async (config) => {
    // النقاط العامة اللي ما تحتاجش توكن
    const publicEndpoints = ["/api/users/signup", "/api/users/login", "/api/users/forgotPassword"];
    if (!publicEndpoints.includes(config.url)) {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log("Sending request to:", config.url);
    console.log("Request Headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response ? error.response.data : null,
    });
    if (error.response?.status === 400) {
      return Promise.reject(
        new Error(error.response.data.message || "Invalid input data")
      );
    } else if (error.response?.status === 401) {
      return Promise.reject(
        new Error("Invalid email or password. Please try again.")
      );
    } else if (error.response?.status === 409) {
      return Promise.reject(new Error("Email already exists"));
    } else if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timed out. Please check your server or network.")
      );
    } else if (!error.response) {
      return Promise.reject(
        new Error("Network error, please check your connection and try again")
      );
    }
    return Promise.reject(error);
  }
);

export default apiClient;