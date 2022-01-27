import axios from 'axios'

const api_raw_material = axios.create({
    baseURL: 'http://http://192.46.227.22:8000/raw_material',
})

export{ api_raw_material }