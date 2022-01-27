import axios from 'axios'

const api_product = axios.create({
    baseURL: 'http://192.46.227.22:8000/product',
    // timeout: 4000,
})

export{ api_product } 