import axios from 'axios'

const api_raw_material = axios.create({
    baseURL: 'http://127.0.0.1:8000/raw_material',
})

export{ api_raw_material }