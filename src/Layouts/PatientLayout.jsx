import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import {
    LayoutDashboard,
    CalendarCheck,
    Search,
    UserCircle,
    History,
    UserMinus,
    BookA,
    Plus,
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

const PatientLayout = () => {
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
        { to: "/patient", icon: LayoutDashboard, label: "الرئيسية", end: true },
        { to: "/patient/appointments", icon: CalendarCheck, label: "مواعيدي القادمة" },
        { to: "/patient/medical-history", icon: History, label: "السجل الطبي" },
        { to: "/patient/profile", icon: UserCircle, label: "الملف الشخصي" },
        { to: "/patient/book", icon: Plus, label: "حجز موعد جديد" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex transition-colors duration-500" dir="rtl">

            {/* 1. القائمة الجانبية - Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                collapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                navItems={navItems}
            />

            {/* 2. منطقة المحتوى الرئيسية */}
            {/* أضفنا lg:pr بدلاً من lg:mr لأننا في وضع RTL */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out 
                ${isCollapsed ? "lg:pr-20" : "lg:pr-72"} pr-0`}>

                {/* التوب بار */}
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* المحتوى المتغير - Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>

                {/* 3. الفوتر - Footer */}
                <footer className={`mt-auto px-8 py-5 border-t backdrop-blur-md transition-all 
                    ${isDark ? "bg-slate-900/40 border-white/5 text-slate-500" : "bg-white/80 border-slate-100 text-slate-400"}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">

                        {/* Status & Version */}
                        <div className="flex items-center gap-5 order-2 md:order-1">
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="relative flex h-2 w-2">
                                    {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-rose-500"}`} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-hover:text-emerald-500">
                                    {isOnline ? "متصل الآن" : "غير متصل"}
                                </span>
                            </div>
                            <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block" />
                            <p className="text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-opacity">BUILD V1.0.0</p>
                        </div>

                        {/* Copyright */}
                        <div className="text-center md:text-left order-1 md:order-2">
                            <p className="text-[10px] font-black tracking-wide leading-relaxed">
                                تم التطوير بواسطة <span className="text-cyan-500 hover:text-cyan-400 transition-colors cursor-pointer">Code Spark System</span>
                                <span className="mx-2 opacity-50">|</span>
                                © {new Date().getFullYear()} جـميع الحقوق محفوظة
                            </p>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PatientLayout;