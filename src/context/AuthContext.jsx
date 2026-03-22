// context/AuthProvider.jsx (أو نفس مسارك الحالي)
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import axiosApi from "../Axios/axios";
import Swal from "sweetalert2";

const AuthContext = createContext(null);
const COOKIE_KEY = "doctor-platform-user";
const cookies = new Cookies();

/**
 * ✅ Normalize: يوحّد شكل المستخدم لأي Role
 */
const normalizeAuthUser = (data) => {
  const role = data?.roles?.[0] || null;

  const profile =
    data?.student
      ? { ...data.student, type: "Student" }
      : data?.teacher
        ? { ...data.teacher, type: "Teacher" }
        : data?.admin
          ? { ...data.admin, type: "Admin" }
          : null;

  const firstName = profile?.firstName ?? profile?.FirstName ?? "";
  const lastName = profile?.lastName ?? profile?.LastName ?? "";

  const name =
    profile?.name ??
    profile?.Name ??
    profile?.fullName ??
    profile?.FullName ?? `${firstName} ${lastName}`.trim() ??
    profile?.username ??
    profile?.userName ??
    profile?.email ??
    data?.student?.email ??
    "";

  return {
    token: data?.token || null,
    roles: Array.isArray(data?.roles) ? data.roles : [],
    role,
    isAuthenticated: !!data?.isAuthenticated,
    expireDate: data?.expireDate || null,
    profile: profile
      ? {
        ...profile,
        firstName,
        lastName,
        name,
      }
      : null,
    raw: data,
  };
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // ✅ تحميل المستخدم من الكوكيز
  useEffect(() => {
    const storedUser = cookies.get(COOKIE_KEY);
    if (storedUser) {
      setUser(storedUser); // storedUser متخزن أصلا بعد normalize
    }
    setLoading(false);
  }, []);

  // console.log(user)

  // ✅ Login
  const login = async (email, password) => {
    try {
      const response = await axiosApi.post("User/Login", {
        email,
        password,
      });

      const normalized = normalizeAuthUser(response.data);

      setUser(normalized);

      cookies.set(COOKIE_KEY, normalized, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
      });

      return normalized;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "فشل تسجيل الدخول";
      throw new Error(typeof errorMsg === "string" ? errorMsg : "فشل تسجيل الدخول");
    }
  };

  // ✅ Register (بعد التسجيل: رسالة تحقق + تحويل للّوجن)
  const register = async (payload) => {
    try {
      const response = await axiosApi.post("User/StudentRegister", payload);

      // ✅ بعد التسجيل مش هنسجل المستخدم دخول
      setUser(null);
      cookies.remove(COOKIE_KEY, { path: "/" });

      // ⚠️ payload هو FormData
      const email =
        typeof payload?.get === "function"
          ? payload.get("Email")
          : payload?.Email || "";

      await Swal.fire({
        title: "تم إنشاء الحساب بنجاح",
        html: `
        <p style="margin-bottom:8px;font-weight:600;">
          برجاء الذهاب للتحقق من البريد الإلكتروني لتفعيل الحساب:
        </p>
        <p style="font-weight:700;color:#0A8DBA;font-size:16px;">
          ${email}
        </p>
      `,
        icon: "success",
        confirmButtonColor: "#0A8DBA",
        confirmButtonText: "الذهاب لتسجيل الدخول",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      window.location.href = "/login";

      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "فشل عملية التسجيل";

      throw new Error(
        typeof errorMsg === "string" ? errorMsg : "فشل عملية التسجيل"
      );
    }
  };


  // ✅ Logout
  const logout = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم تسجيل خروجك من الحساب حالاً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A8DBA",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، سجل الخروج",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. حذف جميع بيانات الاختبارات المخزنة مؤقتاً في المتصفح
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("quiz_")) {
            localStorage.removeItem(key);
          }
        });

        // 2. تصفية بيانات المستخدم من الـ State
        setUser(null);

        // 3. رسالة النجاح
        Swal.fire({
          title: "تم!",
          text: "تم تسجيل الخروج بنجاح.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // 4. حذف الكوكيز
        cookies.remove(COOKIE_KEY, { path: "/" });

        // 5. إعادة التوجيه
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    });
  };

  const computed = useMemo(() => {
    const role = user?.role || user?.profile?.type || null;
    return {
      isAuthenticated: !!user?.token,
      role,
      isStudent: role === "Student",
      isTeacher: role === "Teacher",
      isAdmin: role === "Admin",
      token: user?.token || null,
      displayName: user?.profile?.name || "",
    };
  }, [user]);

  // داخل AuthProvider.jsx
  const updateProfile = (updatedProfile) => {
    setUser(prev => {
      if (!prev) return prev;
      const newUser = {
        ...prev,
        profile: {
          ...prev.profile,
          ...updatedProfile,
        },
      };

      cookies.set(COOKIE_KEY, newUser, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
      });

      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        ...computed,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
