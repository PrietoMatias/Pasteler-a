import axios from 'axios';


const api = axios.create({
    baseURL:'https://pasteler-a-production.up.railway.app/api',
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json'
    }
});

export default api;