import React from "react";
import { X, Stethoscope, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarHeader = ({ onClose, themeStyles, collapsed }) => {
    return (
        <div className={`border-b ${themeStyles.border} py-6 px-4 transition-all duration-300 relative overflow-hidden`}>
            {/* تأثير ضوئي خفيف في الخلفية يعزز هوية العيادة */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />

            <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} relative z-10`}>
                
                <NavLink
                    to="/"
                    className={`relative group flex items-center shrink-0 focus:outline-none transition-all duration-300 ${collapsed ? "gap-0" : "gap-3"}`}
                    dir="rtl"
                >
                    {/* 1. الأيقونة الطبية - حجمها بيبقى متناسق في الحالتين */}
                    <div className={`relative flex items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-800/50 shadow-sm group-hover:shadow-cyan-200/50 transition-all duration-300 ${collapsed ? "w-11 h-11" : "w-12 h-12"}`}>
                        
                        <Stethoscope 
                            className={`${collapsed ? "w-6 h-6" : "w-7 h-7"} text-cyan-600 dark:text-cyan-400`} 
                            strokeWidth={2.5} 
                        />

                        {/* نبض القلب الصغير - بيظهر بس في حالة عدم التصغير أو بشكل أصغر */}
                        <div className={`absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-1 rounded-lg shadow-md border border-cyan-100 dark:border-cyan-800 transition-all ${collapsed ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}>
                            <Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" strokeWidth={3} />
                        </div>
                    </div>

                    {/* 2. نصوص الهوية الطبية - تظهر وتختفي بسلاسة (Animate-in) */}
                    {!collapsed && (
                        <div className="flex flex-col text-right animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="font-black text-xl tracking-tight leading-none text-slate-800 dark:text-white group-hover:text-cyan-600 transition-colors">
                                Dr. <span className="text-cyan-600">Mohamed</span>
                            </h1>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-80">
                                الرعاية الطبية
                            </span>
                        </div>
                    )}
                </NavLink>

                {/* زر الإغلاق للموبايل - بتصميم يتماشى مع الـ Cyan */}
                {!collapsed && (
                    <button 
                        onClick={onClose} 
                        className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SidebarHeader;