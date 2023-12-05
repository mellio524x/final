import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  // baseURL: BASE_URL,
  baseURL: process.env.REACT_APP_BACKEND_API,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Request sent");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response recieved");
    return response;
  },
  (error) => {
    console.log(("Request Error", { error }));
    return Promise.reject(error);
  }
);

export default apiService;
