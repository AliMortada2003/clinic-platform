import axiosApi from "../Axios/axios";

// 1. إضافة Slot جديد ليوم معين (POST)
// { startTime: "10:00", appointmentCount: 5, isAvailable: true }
export const addSlotToDay = async (dayId, slotData) => {
    const res = await axiosApi.post(`/AvailableSlot/${dayId}`, slotData);
    return res.data;
};

// 2. جلب كل الساعات المتاحة ليوم معين (GET)
export const getSlotsByDay = async (dayId) => {
    const res = await axiosApi.get(`/AvailableSlot/day/${dayId}`);
    // console.log(res);
    return res.data;
};

// 3. حذف Slot معين (DELETE)
export const deleteSlot = async (slotId) => {
    const res = await axiosApi.delete(`/AvailableSlot/${slotId}`);
    return res.data;
};
