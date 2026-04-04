export const StatCard = ({ label, count, icon: Icon, colorClass }) => (
    <div className="mb-8 flex items-center justify-between bg-white dark:bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden relative">
        {/* الزخرفة الخلفية */}
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${colorClass}-500/10 rounded-full blur-2xl`} />
        
        <div className="flex items-center gap-5 relative z-10">
            <div className={`w-14 h-14 bg-${colorClass}-500/10 rounded-2xl flex items-center justify-center text-${colorClass}-600`}>
                <Icon size={28} strokeWidth={2.5} />
            </div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mb-1">{label}</p>
                <h4 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                    {count} <span className="text-sm font-medium text-slate-400">حجز</span>
                </h4>
            </div>
        </div>

        <div className="hidden md:block px-6 py-2 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
            <span className={`text-${colorClass}-600 font-black text-xs uppercase tracking-widest`}>نشط حالياً</span>
        </div>
    </div>
);