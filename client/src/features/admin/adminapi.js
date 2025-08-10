import api from "../../service/api";

export const getAllUserAPI = async()=>{
    console.log("i am here")
    const res= await api.get('/api/admin/alluser');
    console.log(res.data);
    return res.data;
}

export const getDashBoardSummaryAPI = async()=>{
    const res = await api.get('/api/admin/summary');
    console.log(res.data)
    return res.data;
}

export const deleteUserAPI =async(id)=>{
    console.log(id)
    const res = await api.delete(`/api/admin/user/${id}`);
    console.log(res.data);
    return res.data;
} 