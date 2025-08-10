import api from "../../service/api"


export const getProductAPI = async()=>{
    const res = await api.get('/api/products');
    return res.data;
}

export const createProductAPi = async(data)=>{
    const res = await api.post('api/products' , data);
    return res.data;
}

export const updateProductAPI =async(id , data)=>{
    const res = await api.patch(`api/products/update/${id}` , data);
    return res.data;
}

export const deleteProductAPI =async(id)=>{
    const res=await api.delete(`api/products/delete/${id}`);
    console.log(res.data);
    return res.data;
}

export const getNewArrivalProductsAPI=async()=>{
    const res=await api.get('api/products/newarival')
    console.log(res.data);
    return res.data;
}

export const getSaleProductsAPI = async()=>{
    const res = await api.get('api/products/saleproduct')
    console.log(res.data);
    return res.data;
}

export const getProductByBrandAPI = async(data)=>{
    const res = await api.get('api/products/brand',{
        params:{brands:data}
    });
    console.log(res.data);
    return res.data;
}

export const getProductBySearchAPI = async(data)=>{
    console.log(data)
    const res = await api.get('api/products/search',{
        params:{category:data}
    });
    console.log(res.data);
    return res.data;
}

export const getProductByPagesAPI = async ({page , limit})=>{
    const res = await api.get(`api/products/loadmore?page=${page}&limit=${limit}`)
    console.log(res.data);
    return res.data;
}