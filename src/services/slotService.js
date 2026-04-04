import axiosApi from "../Axios/axios";

const availableSlotService = {
    // 1. إضافة Slot جديد ليوم معين (POST)
    add: async (dayId, slotData) => {
        // نمرر الـ dayId كـ Path Parameter والـ slotData كـ Body
        const res = await axiosApi.post(`/AvailableSlot/${dayId}`, slotData);
        return res.data;
    },

    // 2. جلب كل الساعات المتاحة ليوم معين (GET)
    getByDay: async (dayId) => {
        const res = await axiosApi.get(`/AvailableSlot/day/${dayId}`);
        return res.data;
    },

    // 3. حذف Slot معين (DELETE)
    delete: async (slotId) => {
        const res = await axiosApi.delete(`/AvailableSlot/${slotId}`);
        return res.data;
    }
};

export default availableSlotService;