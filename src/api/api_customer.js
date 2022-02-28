import axios from "axios";

const api_customer = axios.create({
  baseURL: 'http://192.46.227.22:8081/customer',
  timeout: 1000,
});

export { api_customer };
