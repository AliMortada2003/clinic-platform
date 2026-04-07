import React, { useState, useEffect } from "react";
import { Sun, Moon, LayoutGrid, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "../../hocks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import MobileMenuButton from "./MobileMenuButton";
import UserMenu from "./UserMenu";
import NotificationMenu from './NotificationMenu';
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick, roleLabel }) => {
    const { isDark, toggleTheme } = useTheme();
    const { user, userRole } = useAuth();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const navigate = useNavigate()
    const label = user?.firstName


    useEffect(() => {
        const handleStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", handleStatus);
        window.addEventListener("offline", handleStatus);
        return () => {
            window.removeEventListener("online", handleStatus);
            window.removeEventListener("offline", handleStatus);
        };
    }, []);

    return (
        <header className="sticky top-0 z-30 flex items-center gap-4 py-3 px-4 md:px-8 
            transition-all duration-500 backdrop-blur-xl border-b
            bg-white/70 border-slate-200/60 shadow-sm
            dark:bg-slate-900/80 dark:border-white/[0.05] dark:shadow-2xl">

            {/* القائمة للموبايل */}
            <MobileMenuButton onClick={onMenuClick} isDark={isDark} />

            {/* قسم الترحيب */}
            <div className="flex flex-1 items-center gap-3">
                <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl 
                    bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <LayoutGrid size={22} className="text-cyan-500" />
                </div>

                <div className="flex gap-1">
                    <h1 className="md:text-[25px]  font-black tracking-tight text-slate-900 dark:text-white">
                        أهلاً <span className="bg-gradient-to-l from-cyan-500 to-blue-600 bg-clip-text text-transparent">{label}</span>
                    </h1>
                    <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-rose-500"}`} />
                </div>
            </div>

            {/* منطقة الأدوات */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* زر الثيم - استخدام الكلاسات مباشرة */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-2xl border transition-all active:scale-90
                        bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200
                        dark:bg-white/5 dark:border-white/10 dark:text-yellow-400 dark:hover:bg-white/10"
                >
                    {isDark ? <Sun size={20} strokeWidth={2.2} /> : <Moon size={20} strokeWidth={2.2} />}
                </button>

                {/* فاصل عمودي */}
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />

                <div className="flex items-center gap-1">
                    <NotificationMenu isDark={isDark} />
                    <UserMenu goTo={userRole === "Doctor" ? "/admin/profile" : "/patient/profile"} isOnline={isOnline} theme={isDark ? "dark" : "light"} />
                </div>
            </div>
        </header>
    );
};

export default Topbar;