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
// export const registerUser = (data) => api.post("/register", data);
// export const loginUser = (data) => api.post("/login", data);
// export const logoutUser = () => api.post("/logout");
export const authAPI = {
  registerUser: (data) => api.post("/register", data),
  loginUser: (data) => api.post("/login", data),
  logoutUser: () => api.post("/logout"),
};
export const tweetAPI = {
  getAllTweets: () => api.get("/tweets"),
  createTweet: (body) => api.post("/tweets", { body }),
};
