import { CalendarIcon, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';

const CalendarView = ({
    currentDate,
    setCurrentDate,
    daysLoading,
    serverDays,
    handleDayClick,
    selectedDayName,
    today
}) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const isPrevDisabled = year <= today.getFullYear() && month <= today.getMonth();

    const weekDays = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">

            {/* زخرفة خلفية بسيطة Premium Feeling */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header القسم العلوي */}
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                        <CalendarIcon size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                            {currentDate.toLocaleString('ar-EG', { month: 'long' })}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-400 text-xs font-black tracking-widest">{year}</span>
                            {daysLoading && <Sparkles size={12} className="text-cyan-500 animate-pulse" />}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 bg-slate-50 dark:bg-white/5 p-2 rounded-2xl border border-slate-100 dark:border-white/5">
                    <button
                        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                        disabled={isPrevDisabled}
                        className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl disabled:opacity-40 transition-all text-slate-600 dark:text-slate-300 shadow-sm active:scale-90"
                    >
                        <ChevronRight size={22} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                        className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-600 dark:text-slate-300 shadow-sm active:scale-90"
                    >
                        <ChevronLeft size={22} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* أيام الأسبوع */}
            <div className="grid grid-cols-7 mb-6 relative z-10">
                {weekDays.map(d => (
                    <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {d}
                    </div>
                ))}
            </div>

            {/* شبكة الأيام */}
            <div className="grid grid-cols-7 gap-3 relative z-10">
                {daysLoading ? (
                    <div className="col-span-7 py-24 flex flex-col items-center">
                        <div className="relative">
                            <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} strokeWidth={1.5} />
                            <div className="absolute inset-0 blur-xl bg-cyan-500/20 animate-pulse" />
                        </div>
                        <p className="text-slate-400 text-sm font-bold tracking-wide">جاري فحص المواعيد المتاحة...</p>
                    </div>
                ) : (
                    <>
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isAvailable = serverDays?.some(d => (d.date || d.availableDay)?.startsWith(dateStr)) && new Date(year, month, day).setHours(0, 0, 0, 0) >= new Date(today).setHours(0, 0, 0, 0);
                            const isSelected = selectedDayName === dateStr;
                            return (
                                <motion.button
                                    key={day}
                                    whileHover={isAvailable ? { scale: 1.1, y: -2 } : {}}
                                    whileTap={isAvailable ? { scale: 0.9 } : {}}
                                    onClick={() => handleDayClick(day, isAvailable)}
                                    className={`
                                        aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-black transition-all relative
                                        ${isAvailable
                                            ? 'bg-cyan-100 dark:bg-cyan-500/10 border-2 border-cyan-100 dark:border-cyan-500/20 text-cyan-500 dark:text-cyan-400 cursor-pointer shadow-sm shadow-cyan-500/5'
                                            : 'text-slate-400 dark:text-slate-700 pointer-events-none border-2 border-transparent'}
                                        ${isSelected
                                            ? '!bg-cyan-500 !border-cyan-500 !text-white shadow-2xl shadow-cyan-500/40 z-20 scale-110'
                                            : ''}
                                    `}
                                >
                                    {day}
                                    {/* نقطة "متاح" لو مش مختارين اليوم */}
                                    {isAvailable && !isSelected && (
                                        <span className="absolute bottom-1.5 w-1 h-1 bg-cyan-500 rounded-full" />
                                    )}
                                </motion.button>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Footer التوضيحي */}
            {!daysLoading && (
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">متاح للحجز</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">غير متاح</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CalendarView;