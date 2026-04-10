import axiosApi from "../Axios/axios";

// patientService.js
export const PatientServices = {
    getAll: async () => {
        const res = await axiosApi.get('/Patient');
        return res.data;
    },
    delete: async (id) => {
        return await axiosApi.delete(`/Patient/${id}`);
    },
    getOnePatient: async (id) => {
        return await axiosApi.get(`/Patient/${id}`);
    },
    update: async (id, data) => {
        return await axiosApi.patch(`/Patient/${id}`, data);
    }
}