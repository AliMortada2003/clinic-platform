import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import {
    LayoutDashboard,
    UserCog,
    ClipboardList,
    Users,
    Timer,
    UserPlus,
    Paperclip,
    Wallet2,
    User,
    Plus,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AdminLayout = () => {
    const { isDark } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // متابعة حالة الاتصال بالإنترنت
    useEffect(() => {
        const handleStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", handleStatus);
        window.addEventListener("offline", handleStatus);
        return () => {
            window.removeEventListener("online", handleStatus);
            window.removeEventListener("offline", handleStatus);
        };
    }, []);

    const navItems = [
        { to: "/admin", icon: LayoutDashboard, label: "الرئيسية", end: true },
        { to: "/admin/appointments", icon: ClipboardList, label: "طلبات الحجز" },
        { to: "/admin/schedule", icon: Timer, label: "تنظيم وقتي" },
        { to: "/admin/bookmanual", icon: Plus, label: "إضافة حجز يدوي" },
        { to: "/admin/patients", icon: Users, label: " المرضى المسجلين" },
        { to: "/admin/reports", icon: Paperclip, label: "السجلات الخاصة بالمرضى" },
        { to: "/admin/profile", icon: Wallet2, label: "بيانات العيادة" },
        { to: "/admin/doctormanage", icon: User, label: "إدارة الاطباء" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex transition-colors duration-300" dir="rtl">

            {/* 1. القائمة الجانبية */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                collapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                navItems={navItems}
            />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out 
    ${isCollapsed ? "lg:mr-20" : "lg:mr-72"} mr-0 overflow-hidden`}>
                {/* ^ ضفنا min-w-0 و overflow-hidden هنا */}
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* المحتوى المتغير */}
                <main className="p-4 md:p-8 flex-1 overflow-y-auto">
                    {/* ^ ضفنا overflow-y-auto عشان السكرول يكون هنا بس */}
                    <div className="max-w-7xl mx-auto w-full">
                        {/* ^ ضفنا w-full عشان نضمن إنه يملأ المساحة المتاحة */}
                        <Outlet />
                    </div>
                </main>
                {/* 3. الفوتر - مدمج داخل منطقة المحتوى */}
                <footer className={`mt-auto px-6 py-4 border-t transition-all 
                    ${isDark ? "bg-slate-900/50 border-white/5 text-slate-500" : "bg-white border-slate-100 text-slate-400"}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">

                        <div className="flex items-center gap-4 order-2 md:order-1">
                            <div className="flex items-center gap-1.5">
                                <div className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-rose-500"}`} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                    {isOnline ? "Online" : "Offline"}
                                </span>
                            </div>
                            <span className="text-[10px] opacity-30">|</span>
                            <p className="text-[10px] font-medium">V 1.0.0</p>
                        </div>

                        <div className="text-center md:text-left order-1 md:order-2">
                            <p className="text-[10px] font-bold">
                                Developed by <span className="text-blue-500">Code Spark System</span> © {new Date().getFullYear()}
                            </p>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;