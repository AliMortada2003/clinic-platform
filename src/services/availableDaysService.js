import axiosApi from "../Axios/axios";

const availableDayService = {
    // جلب كل الأيام المتاحة
    getAll: async () => {
        const res = await axiosApi.get("AvailableDay/WithUnAvailable");
        // console.log(res)
        return res.data;
    },
    getAllAvailableDays: async () => {
        const res = await axiosApi.get("AvailableDay");
        // console.log(res)
        return res.data;
    },
    // إضافة يوم جديد (Admin Only)
    // ملاحظة: غيرتها لـ post ومررت الداتا اللي هتبعتها
    add: async (dayData) => {
        const res = await axiosApi.post("/AvailableDay", dayData);
        // console.log(res)
        return res.data;
    },

    // جلب يوم محدد بالتفاصيل
    getById: async (id) => {
        const res = await axiosApi.get(`/AvailableDay/${id}`);
        return res.data;
    },

    // حذف يوم (Admin Only)
    delete: async (id) => {
        const res = await axiosApi.delete(`/AvailableDay/${id}`);
        return res.data;
    },

    // تفعيل اليوم (Admin Only)
    activate: async (id) => {
        const res = await axiosApi.patch(`/AvailableDay/Activate`, null, {
            params: { id }
        });
        return res.data;
    },

    // إلغاء تفعيل اليوم (Admin Only)
    cancel: async (id) => {
        const res = await axiosApi.patch(`/AvailableDay/Cancel`, null, {
            params: { id }
        });
        return res.data;
    }
};

export default availableDayService;