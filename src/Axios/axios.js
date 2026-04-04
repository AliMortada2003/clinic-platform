import axios from "axios";

// استخدم المتغير من الـ .env لو موجود، وإلا استخدم الرابط المباشر
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://abdoerfan333555-001-site1.ntempurl.com/api";

const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: false, // شيلها أو خليها false لو مش بتستخدم Cookies في الـ API حالياً
});
export default axiosApi;