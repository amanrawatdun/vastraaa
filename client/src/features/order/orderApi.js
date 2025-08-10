import api from "../../service/api"

export const createOrderAPI = async (formData)=>{
    
    const res =await api.post('api/orders',  formData);
    console.log(res.data);
    return res.data;
}

export const getOrdersAPI = async()=>{
    const res = await api.get('api/orders/myorders');
    console.log(res.data);
    return res.data;
}

export const getAllOrdersAPI = async()=>{
    const res = await api.get('api/orders/all');
    console.log(res.data);
    return res.data;
}

export const updateOrderStatusAPI = async(orderId)=>{
    const res = await api.put(`api/orders/${orderId}/deliver`);
    console.log(res.data);
    return res.data;
}

export const markOrderAsPaidAPI = async(orderId)=>{
    const res = await api.put( `api/orders/${orderId}/pay`);
    return res.data;
}

export const deleteOrderAPI = async(orderId)=>{
    console.log(orderId);
    const res = await api.delete(`api/orders/${orderId}/delete`);
    console.log(res.data);
    return res.data;
}