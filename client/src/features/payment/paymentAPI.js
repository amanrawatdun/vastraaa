
import api from '../../service/api';

export const createPaymentAPI = async (data) => {
    const res = await api.post('/api/payments/create-order', data);
    return res;
};

export const verifyPaymentAPI = async (data) => {
    const res = await api.post('/api/payments/verify', data);
    return res;
};
