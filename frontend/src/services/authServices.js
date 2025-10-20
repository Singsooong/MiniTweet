import axios from "axios";
const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  registerUser: (data) => api.post("/register", data),
  loginUser: (data) => api.post("/login", data),
  logoutUser: () => api.post("/logout"),
  getCurrentUser: () => api.get("/me"),
};
export const tweetAPI = {
  getAllTweets: () => api.get("/tweets"),
  createTweet: (data) => api.post("/tweets", data),
  likeTweet: (id) => api.post(`/tweets/${id}/like`),
};
