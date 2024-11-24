import axios from 'axios';

const api = axios.create({
    baseURL:'https://pasteleiabackend.onrender.com/api',
    withCredentials:true,
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json'
    }
});

export default api;