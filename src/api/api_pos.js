import axios from "axios";

const api_pos = axios.create({
  baseURL: 'http://192.46.227.22:8000/pos',
});

export { api_pos };
