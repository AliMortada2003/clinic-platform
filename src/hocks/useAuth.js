import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/authService";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const cookies = new Cookies();

export const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // state to whatch user
    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => cookies.get("user_data") || null,
        initialData: cookies.get("user_data"), // عشان يبدأ بالبيانات المحفوظة
        staleTime: Infinity, // البيانات مش هتنتهي صلاحيتها إلا لو إحنا مسحناها
    });

    const isLoading = isUserLoading;
    // 1 login function
    const loginMutation = () => useMutation({
        mutationFn: api.login,
        onSuccess: (response) => {
            // فك البيانات من أوبجكت الـ data اللي راجع من axios
            const { token, patient, doctor, roles, expireDate } = response;
            const activeUser = patient || doctor; // الجوكر: المريض أو الطبيب
            console.log(response)
            const cookieOptions = {
                path: "/",
                expires: new Date(expireDate),
                secure: true,
                sameSite: 'strict'
            };

            // حفظ البيانات في الكوكيز
            cookies.set("auth_token", token, cookieOptions);
            cookies.set("user_data", activeUser, { path: "/" });
            cookies.set("user_role", roles[0], { path: "/" });

            // تحديث كاش React Query
            queryClient.setQueryData(["user"], activeUser);

            // إظهار تنبيه النجاح
            Swal.fire({
                icon: 'success',
                title: 'تم تسجيل الدخول بنجاح',
                text: `مرحباً بك، ${activeUser.firstName}`,
                timer: 1500,
                showConfirmButton: false,
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
            });

            // التوجيه الذكي بعد التنبيه
            setTimeout(() => {
                if (roles.includes("Doctor") || roles.includes("Admin")) {
                    navigate("/admin");
                } else {
                    navigate("/patient");
                }
            }, 1500);
        },
        onError: (err) => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'فشل تسجيل الدخول',
                text: err.response?.data || 'تأكد من رقم الهاتف أو كلمة المرور',
                confirmButtonColor: '#0891b2', // لون الكيان
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
            });
        }
    });
    // 2. هوك إنشاء حساب جديد (مع تنبيهات الـ Swal)
    const registerMutation = () => useMutation({
        mutationFn: api.register,
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'تم إنشاء الحساب بنجاح',
                text: 'يمكنك الآن تسجيل الدخول باستخدام بياناتك',
                confirmButtonColor: '#0891b2',
            });
            navigate("/login");
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'فشل التسجيل',
                text: err.response?.data?.message || 'هناك خطأ في البيانات المدخلة',
                confirmButtonColor: '#ef4444',
            });
        }
    });

    // 3. دالة تسجيل الخروج (Logout)
    const logout = async () => {
        const result = await Swal.fire({
            title: 'هل تريد تسجيل الخروج؟',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'نعم، اخرج',
            cancelButtonText: 'إلغاء',
            confirmButtonColor: '#0891b2',
            cancelButtonColor: '#64748b',
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'جاري تسجيل الخروج...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // محاكاة تأخير بسيط لإنهاء الجلسة بأمان
            await new Promise(resolve => setTimeout(resolve, 800));

            // تنظيف الكوكيز والكاش
            cookies.remove("auth_token", { path: "/" });
            cookies.remove("user_data", { path: "/" });
            cookies.remove("user_role", { path: "/" });
            queryClient.clear(); // يمسح كل الكاش لضمان الخصوصية

            navigate("/login");
            Swal.close();
        }
    };

    return {
        loginMutation,
        registerMutation,
        logout,
        isAuthenticated: !!user,
        user,
        userRole: cookies.get("user_role"),
        isLoading
    };
};