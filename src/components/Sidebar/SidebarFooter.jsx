import React from 'react';
import { ShieldCheck } from 'lucide-react';

function SidebarFooter({ themeStyles, collapsed }) {
    // 1. في وضع التصغير (Collapsed)
    if (collapsed) {
        return (
            <div className={`py-6 flex flex-col items-center gap-3 border-t ${themeStyles.border} animate-in fade-in duration-500`}>
                {/* نقطة خضراء متوهجة تدل على أن النظام يعمل */}
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </div>
                {/* رقم الإصدار بشكل رأسي وأنيق */}
                <span className="text-[9px] font-black text-slate-400 tracking-tighter origin-center -rotate-90">
                    V1.0
                </span>
            </div>
        );
    }

    // 2. في الوضع العادي (Expanded)
    return (
        <div className={`p-5 border-t ${themeStyles.border} bg-slate-50/30 dark:bg-white/0 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className="flex items-center justify-between gap-2">
                
                {/* معلومات النظام والحماية */}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                        <ShieldCheck size={10} className="text-cyan-600 opacity-70" />
                        <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400">
                            نظام الرعاية الآمن
                        </p>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400/60 mr-4">
                        الإصدار المستقر 1.0.0
                    </p>
                </div>
                
                {/* حالة الاتصال (Live Status) */}
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-[9px] text-slate-700 dark:text-emerald-400 font-black tracking-tight">
                        LIVE
                    </span>
                </div>

            </div>

            {/* سطر إضافي للحقوق أو اسم المطور بشكل رقيق جداً */}
            <div className="mt-3 text-center">
                <p className="text-[7px] font-medium text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                    Powered by El-Tafawuq Platform
                </p>
            </div>
        </div>
    );
}

export default SidebarFooter;