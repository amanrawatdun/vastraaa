import axios from 'axios';

const api = axios.create({
    baseURL:'https://vastraaa-backend.onrender.com'
})

api.interceptors.request.use((data)=>{
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.token){
        data.headers.Authorization=`Bearer ${user.token}`
    }
    return data;
})

export default api;
