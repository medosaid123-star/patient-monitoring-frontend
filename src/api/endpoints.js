const BASE_URL = "http://10.182.240.137:3000"; // عدليه لو الـ IP مختلف

export const ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/users/signup`,
    LOGIN: `${BASE_URL}/api/users/login`,
    FORGOT_PASSWORD: `${BASE_URL}/api/users/forgotPassword`,
    RESET_PASSWORD: `${BASE_URL}/api/users/resetPassword`,
  },
};