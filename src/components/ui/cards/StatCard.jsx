import React from 'react';

const StatCard = ({
    title,
    value,
    subtext,
    icon: Icon,
    accent, // بنستقبل الكلاسات زي: "bg-blue-600" أو "bg-rose-500"
    change,
    changeType = 'neutral',
    path,
    onClick
}) => {
    // تحديد ألوان الـ Badges (تتغير تلقائياً في المودين)
    const changeStyles = {
        increase: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
        decrease: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
        success: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
        warning: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
        neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
        info: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
    };

    const changeIcons = {
        increase: '↗',
        decrease: '↘',
        success: '✓',
        warning: '!',
        neutral: '→',
        info: 'i',
    };

    return (
        <div 
            onClick={onClick}
            className={`
                group relative overflow-hidden cursor-pointer
                /* اللايت مود */
                bg-white border-slate-200 shadow-sm
                /* الدارك مود */
                dark:bg-slate-900/40 dark:border-slate-800 dark:backdrop-blur-md
                /* التأثيرات */
                rounded-[2rem] border p-6 transition-all duration-300 
                hover:shadow-xl hover:-translate-y-1 active:scale-95
            `}
        >
            {/* الدائرة الخلفية الـ Decorative - تظهر بلمسة خفيفة جداً */}
            <div className={`absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-[0.03] dark:opacity-[0.07] transition-transform group-hover:scale-150 ${accent}`} />

            <div className="relative flex items-start justify-between">
                <div className="space-y-3">
                    {/* العنوان */}
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                        {title}
                    </p>
                    
                    {/* القيمة والـ Badge */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                                {value}
                            </h3>
                            {change && (
                                <span className={`flex items-center justify-center gap-1 text-[10px] px-2 py-0.5 rounded-lg font-black ${changeStyles[changeType]}`}>
                                    {changeIcons[changeType]} {change}
                                </span>
                            )}
                        </div>
                        {/* النص الفرعي */}
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            {subtext}
                        </p>
                    </div>
                </div>

                {/* الأيقونة */}
                <div className={`
                    flex h-14 w-14 items-center justify-center rounded-2xl 
                    shadow-lg transition-transform duration-500 group-hover:rotate-12
                    ${accent} 
                    ${accent.includes('text-') ? '' : 'text-white'} /* لو مبعوتش لون تيكست خليه أبيض */
                `}>
                    <Icon className="h-7 w-7" strokeWidth={2.5} />
                </div>
            </div>
            
            {/* خط سفلي جمالي يظهر عند الهوفر */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${accent}`} />
        </div>
    );
};

export default StatCard;