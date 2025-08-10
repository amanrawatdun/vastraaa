import api from '../../service/api';

export const loginAPI = async(data)=>{
    const res = await api.post( '/api/users/login'  , data);
    return res.data;
}

export const registerAPI = async(data)=>{
    const res = await api.post( '/api/users/register' , data);
    return res.data;
}

