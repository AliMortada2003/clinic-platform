import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullPageLoader from "../components/ui/layout/FullPageLoader";
import { useMemo } from "react";
import { useAuth } from './../hocks/useAuth';

export default function PrivateRoute({ allowedRoles }) {
    // const { user, loading, isAuthenticated, role } = useAuth();
    // const location = useLocation();

    // // 1. استخراج الرتبة (يجب أن يكون هنا قبل أي return)
    // const userRole = (role || user?.profile?.type || user?.role || "").toLowerCase();

    // // 2. حساب مسار لوحة التحكم (يجب أن يكون هنا قبل أي return)
    // const dashboardPath = useMemo(() => {
    //     if (!userRole) return "/";
    //     if (userRole === "superadmin" || userRole === "admin") return "/admin-dashboard";
    //     if (userRole === "teacher") return "/teacher-dashboard";
    //     if (userRole === "student") return "/student";
    //     return "/";
    // }, [userRole]);

    // // --- الآن نبدأ في جمل الـ Return (الشروط) ---

    // // 3. حالة التحميل
    // if (loading) return <FullPageLoader />;

    // // 4. التحقق من تسجيل الدخول
    // if (!isAuthenticated || !user) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    // // 5. التحقق من الصلاحيات (الرتب المسموحة)
    // if (allowedRoles && allowedRoles.length > 0) {
    //     const formattedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());
    //     if (!formattedAllowedRoles.includes(userRole)) {
    //         // توجيه المستخدم لمكانه الصحيح بناءً على حسابه
    //         return <Navigate to={dashboardPath} replace />;
    //     }
    // }

    // 6. النجاح: عرض المحتوى
    return <Outlet />;
}