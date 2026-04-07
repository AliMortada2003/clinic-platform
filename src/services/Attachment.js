import axiosApi from "../Axios/axios";

export const attachmentService = {
    // الرفع باستخدام ID الموعد
    upload: async (appointmentId, formData) => {
        console.log(appointmentId, formData)
        const response = await axiosApi.post(`/PatientAttachment/${appointmentId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // جلب المرفقات لموعد معين (أو مريض إذا كان الـ API يدعم ذلك)
    getAttachmentByAppointmentId: async (appointmentId) => {
        const response = await axiosApi.get(`/PatientAttachment/${appointmentId}`);
        return response.data;
    },
};