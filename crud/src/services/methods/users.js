import api from '../api.js';


export const login = async (data)=>{
    try {
        const response = await api.post('/login', data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error login user');
    }
}

export const register = async (data)=>{
    try {
        const response = await api.post('/register');
        return response.data;
    } catch (error) {
        console.error('Error register user');
    }
}

