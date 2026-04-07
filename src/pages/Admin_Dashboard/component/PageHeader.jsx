import React from 'react';

const PageHeader = ({ title, description, icon: Icon, children }) => {
    return (
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-sm mb-8 transition-all">
            {/* زخرفة خلفية بسيطة */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    {/* Icon Container */}
                    {Icon && (
                        <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                            <Icon size={32} strokeWidth={2.5} />
                        </div>
                    )}

                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-cyan-700 dark:text-white tracking-tight">
                            {title}
                        </h1>
                        <p className="text-cyan-400 dark:text-slate-400 mt-1 font-medium">
                            {description}
                        </p>
                    </div>
                </div>

                {/* المكان اللي هنحط فيه الـ Search أو الـ Buttons */}
                <div className="flex items-center gap-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;