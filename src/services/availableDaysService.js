import axiosApi from "../Axios/axios"

export const getAllAvailableDays = async ()=>{
    const res = await axiosApi.get("/AvailableDay");
    // console.log(res.data);
    return res.data;
}

// add available day for admin only
export const addAvailableDay = async ()=>{
    const res = await axiosApi.get("/AvailableDay");
    return res.data;
}

// get one Day 
export const getOneAvailableDay = async (id) =>{
    const res = await axiosApi.get(`/AvailableDay/${id}`);
    return res.data;
}

// delete Available Day for admin only
export const DeleteAvailableDay = async (id)=>{
    const res = await axiosApi.delete(`/AvailableDay/${id}`);
    return res.data;
}

// Active Day, for admin only
export const avtiveAvailableDay = async(id)=>{
    const res = await axiosApi.patch(`/AvailableDay/Activate`, null, {
            params: {
                id: id
            }
        });
        return res.data;
}

// Cancel active Day for admin only
export const cancelAvailableDay = async(id)=>{
    const res = await axiosApi.patch(`/AvailableDay/Cancel`, null,{
        params:{
            id:id
        }
    });
    return res.data;
}