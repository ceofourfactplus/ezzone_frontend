import axios from "axios";

const api_user = axios.create({
  baseURL: "http://192.46.227.22:8000/user",
  timeout: 1000,
});

export { api_user };
