import axiosApi from "../Axios/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// تسجيل دخول
export const login = async (credentials) => {
    const res = await axiosApi.post("/User/Login", credentials);
    // console.log(res.data)
    return res.data;
};

// تسجيل حساب جديد
export const register = async (userData) => {
    const res = await axiosApi.post("/User/PatientRegistration", userData);
    // console.log(res)
    return res.data;
};
