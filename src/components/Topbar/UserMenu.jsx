import React, { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, User2 } from "lucide-react";
import { useAuth } from "../../hocks/useAuth";
import { Link } from "react-router-dom";

const UserMenu = ({ isOnline, goTo }) => {
    const { logout, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userRef = useRef(null);
    // console.log(user)

    const image = "/images/user.webp";

    // إغلاق عند الضغط بالخارج
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        logout();
    };

    return (
        <div className="relative" ref={userRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-xl p-1 hover:bg-white/10 transition-all active:scale-95"
            >
                <div className="relative h-10 w-10 rounded-full bg-white/20 border border-white/30 overflow-hidden shadow-inner flex items-center justify-center text-white font-bold">
                    <img src={image} alt="profile" className="w-full h-full object-cover" />
                    <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b5963] ${isOnline ? "bg-emerald-500" : "bg-red-500"}`} />
                </div>
                <ChevronDown size={16} className={`text-white transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b mb-1 text-center">
                        <p className="text-[10px] text-cyan-600 font-bold uppercase tracking-tight">رقم الهاتف</p>
                        <p className="text-xs font-bold text-cyan-800 truncate">{user?.phoneNumber}</p>
                        <p className="text-[10px] text-cyan-600 font-bold uppercase tracking-tight">الاسم</p>
                        <p className="text-xs font-bold text-cyan-800 truncate">{user?.firstName + " " + user?.lastName}</p>
                    </div>

                    <Link
                        type="button"
                        onClick={() => { setIsDropdownOpen(false) }}
                        to={goTo}
                        className="w-full flex items-center justify-end gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <span>إعدادات الملف</span>
                        <User2 size={16} />
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogoutClick}
                        className="w-full flex items-center justify-end gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-50 mt-1"
                    >
                        <span className="font-bold">تسجيل الخروج</span>
                        <LogOut size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;