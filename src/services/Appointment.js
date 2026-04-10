import axiosApi from "../Axios/axios";

const appointmentService = {
    // 1. حجز لمريض "Guest"
    bookGuest: async (slotId, patientData) => {
        const res = await axiosApi.post(`/Appointment/slot/${slotId}/Guest`, patientData);
        return {
            ...res.data.appointment[0],
            message: res.data.message
        };
    },

    // 2. حجز لمريض مسجل مسبقاً
    bookPatient: async (pid, sid) => {
        const res = await axiosApi.post(`/Appointment/${pid}/slot/${sid}`);
        return {
            ...res.data.appointment[0],
            message: res.data.message
        };
    },

    // 3. تحديث حالة الحجز (Pending, Accepted, Canceled)
    updateStatus: async (aid, status) => {
        const res = await axiosApi.put(`/Appointment/${aid}/status`, null, {
            params: { status: status } // Axios هيحولها تلقائياً لـ ?status=Accepted
        });
        return res.data;
    },
    // 4. إضافة سبب الإلغاء
    updateReason: async (aid, reason) => {
        const res = await axiosApi.put(`/Appointment/${aid}/cancellation-reason`, {
            cancellationReason: reason
        });
        return res.data;
    },

    // 5. استعلام برقم الهاتف
    getByPhone: async (phone) => {
        const res = await axiosApi.get(`/Appointment/Phone/${phone}`);
        return res.data;
    },

    // 6- جلب الحجوزات الخاصة بالمريض
    getPatientAppointments: async (patientId) => {
        const res = await axiosApi.get(`/Appointment/Patient/${patientId}`);
        return res.data;
    },

    // 7. جلب كل المواعيد (للأدمن)
    getAll: async () => {
        const res = await axiosApi.get("/Appointment");
        return res.data;
    },

    getAllInPresent: async () => {
        const res = await axiosApi.get("/Appointment/Present");
        return res.data;
    }
    ,

    getByStatus: async (status) => {
        // الحالة هنا بتتحط مباشرة في الـ URL كـ Path
        const res = await axiosApi.get(`/Appointment/Status/${status}`);
        return res.data;
    }
};

export default appointmentService;