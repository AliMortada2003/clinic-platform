import axiosApi from "../Axios/axios";

// 1. حجز لمريض "Guest" (اللي بنستخدمه حالياً)
export const bookGuestAppointment = async (slotId, patientData) => {
    // نمرر الـ slotId مباشرة في الـ URL والبيانات في الـ Body
    const res = await axiosApi.post(`/Appointment/slot/${slotId}/Guest`, patientData);
    return res.data;
};

// 2. حجز لمريض مسجل مسبقاً (عن طريق الـ ID)
export const bookPatientAppointment = async (pid, sid) => {
    const res = await axiosApi.post(`/Appointment/${pid}/slot/${sid}`);
    return res.data;
};

// 3. تحديث حالة الحجز (Pending, Accepted, Canceled)
export const updateAppointmentStatus = async (aid, status) => {
    const res = await axiosApi.put(`/Appointment/${aid}/status?status=${status}`);
    return res.data;
};

// 4. إضافة سبب الإلغاء
export const updateCancellationReason = async (aid, reason) => {
    const res = await axiosApi.put(`/Appointment/${aid}/cancellation-reason`, {
        cancellationReason: reason
    });
    return res.data;
};

// 5. استعلام عن حجز برقم الهاتف
export const getAppointmentByPhone = async (phone) => {
    const res = await axiosApi.get(`/Appointment/Phone/${phone}`);
    return res.data;
};