import axios from 'axios'

const api_promotion = axios.create({
    baseURL: 'http://192.46.227.22:8081/promotion/',
})

export{ api_promotion }