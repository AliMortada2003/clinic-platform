import axiosApi from "../Axios/axios";

export const doctorService = {
    // جلب بيانات كل الدكاترة (لو محتاجها في لوحة الإدارة)
    getAll: async () => {
        const { data } = await axiosApi.get('/Doctor');
        return data;
    },
    // جلب بيانات دكتور واحد بالـ ID
    getOne: async (id) => {
        const { data } = await axiosApi.get(`/Doctor/${id}`);
        return data;
    },
    // تحديث جزئي للبيانات (PATCH)
    patch: async (id, doctorData) => {
        const { data } = await axiosApi.patch(`/Doctor/${id}`, doctorData);
        return data;
    },
    // حذف دكتور
    delete: async (id) => {
        const { data } = await axiosApi.delete(`/Doctor/${id}`);
        return data;
    },
    register: async (doctorData) => {
        const { data } = await axiosApi.post('/User/DoctorRegistration', doctorData);
        return data;
    },
};