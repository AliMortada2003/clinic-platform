import React from 'react';
import { Stethoscope, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DoctorLogo = () => {
    return (
        <NavLink
            to="/"
            className="relative group flex items-center gap-3 shrink-0 focus:outline-none px-1 py-1"
            dir="rtl"
        >
            {/* 1. الأيقونة البصرية (Medical Iconography) */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-800/50 shadow-sm group-hover:scale-110 transition-all duration-300">
                
                {/* أيقونة السماعة الطبية باللون الـ Cyan */}
                <Stethoscope className="w-7 h-7 text-cyan-600 dark:text-cyan-400 transition-colors" strokeWidth={2} />

                {/* نبض القلب الصغير (رمز الحياة والنشاط) */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-1 rounded-lg shadow-md border border-cyan-100 dark:border-cyan-800">
                    <Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" strokeWidth={3} />
                </div>
            </div>

            {/* 2. النصوص المنسقة (Typography) */}
            <div className="flex flex-col text-right">
                {/* الاسم الرئيسي */}
                <span className="font-extrabold text-2xl tracking-tight leading-tight text-slate-600 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    Dr. <span className="text-cyan-600 dark:text-cyan-400  dark:group-hover:text-white transition-colors">Mohamed</span>
                </span>

                {/* العنوان الفرعي */}
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] -mt-0.5">
                    منصة الرعاية الطبية
                </span>
            </div>

            {/* تأثير الوهج الخلفي باللون الـ Cyan عند التحويم */}
            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 rounded-2xl transition-all duration-300 -z-10 blur-xl"></div>
        </NavLink>
    );
};

export default DoctorLogo;