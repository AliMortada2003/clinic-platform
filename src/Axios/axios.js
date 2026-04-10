import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://abdoerfan333555-001-site1.ntempurl.com/api";

const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// إضافة الـ Interceptor لإرسال التوكن مع كل ريكوست
axiosApi.interceptors.request.use(
    (config) => {
        const token = cookies.get("auth_token");
        if (token) {
            // إضافة التوكن في الـ Headers بصيغة Bearer Token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// (اختياري) إضافة Interceptor للتعامل مع انتهاء صلاحية التوكن (401)
axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // ممكن هنا تعمل Logout تلقائي لو السيرفر رفض التوكن
            console.error("Token expired or unauthorized");
        }
        return Promise.reject(error);
    }
);

export default axiosApi;