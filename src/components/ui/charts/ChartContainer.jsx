import React from 'react';
import { ResponsiveContainer } from 'recharts';

const ChartContainer = ({
    title,
    description,
    icon: Icon,
    children,
    className = '',
    headerActions,
    height = 350, // زودنا الارتفاع الافتراضي شوية عشان الرؤية تكون أوضح
    isLoading = false,
    isEmpty = false,
    emptyMessage = "لا توجد بيانات متاحة حالياً"
}) => {
    return (
        <div className={`
            /* الأساسيات */
            rounded-[2rem] border p-8 transition-all duration-300
            /* اللايت مود */
            bg-white border-slate-100 shadow-sm
            /* الدارك مود */
            dark:bg-slate-900/50 dark:border-slate-800 dark:backdrop-blur-md
            ${className}
        `}>
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {Icon && (
                        <div className={`
                            flex h-12 w-12 items-center justify-center rounded-2xl
                            bg-blue-50 text-blue-600 
                            dark:bg-blue-500/10 dark:text-blue-400
                        `}>
                            <Icon className="h-6 w-6" strokeWidth={2.5} />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* الأزرار الإضافية (زي فلتر التاريخ مثلاً) */}
                <div className="flex items-center gap-2">
                    {headerActions}
                </div>
            </div>

            {/* Chart Content Area */}
            <div className="relative" style={{ height: `${height}px` }}>
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600/20 border-t-blue-600"></div>
                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 animate-pulse">
                                جاري تحليل البيانات...
                            </p>
                        </div>
                    </div>
                ) : isEmpty ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                                <svg className="h-8 w-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-wide">
                                {emptyMessage}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* ResponsiveContainer لازم يكون جواه الرسم البياني نفسه من ريتشارتس */
                    <ResponsiveContainer width="100%" height="100%">
                        {children}
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default ChartContainer;