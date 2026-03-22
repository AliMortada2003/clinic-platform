import { ChevronRight, ChevronLeft, Loader2, Calendar as CalendarIcon, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    // تشكيلة أيام الأسبوع بشكل شيك
    const weekDays = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    return (
        <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-slate-800 transition-all duration-500">

            {/* زخرفة خلفية خفيفة */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header: Month & Navigation */}
            <div className="relative flex items-center justify-between mb-12 px-2">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-2xl text-cyan-600 dark:text-cyan-400">
                        <CalendarIcon size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white capitalize tracking-tight">
                            {currentDate.toLocaleString('ar-EG', { month: 'long' })}
                        </h3>
                        <p className="text-slate-400 text-sm font-bold">{year}</p>
                    </div>
                </div>

                <div className="flex gap-3 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-[1.5rem] border border-slate-200/50 dark:border-slate-700/50">
                    <button
                        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                        disabled={isPrevDisabled}
                        className="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl disabled:opacity-10 transition-all active:scale-90 shadow-sm dark:text-white"
                    >
                        <ChevronRight size={22} />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                        className="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all active:scale-90 shadow-sm dark:text-white"
                    >
                        <ChevronLeft size={22} />
                    </button>
                </div>
            </div>

            {/* Week Days Label */}
            <div className="grid grid-cols-7 mb-6">
                {weekDays.map((d, index) => (
                    <div key={d} className="text-center font-black md:text-[18px] text-[12px] uppercase tracking-widest text-cyan-500">
                        {d}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 ">
                {daysLoading ? (
                    <div className="col-span-7 py-24 flex flex-col items-center justify-center">
                        <div className="relative">
                            <Loader2 className="animate-spin text-cyan-500" size={48} />
                            <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
                        </div>
                        <span className="mt-4 text-slate-400 font-bold animate-pulse">جاري تنسيق المواعيد...</span>
                    </div>
                ) : (
                    <>
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`e-${i}`} className="aspect-square" />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isAvailable = serverDays?.some(d => (d.availableDay || d.date)?.startsWith(dateStr)) && new Date(year, month, day) >= today;
                            const isSelected = selectedDayName === dateStr;

                            return (
                                <motion.button
                                    key={day}
                                    whileHover={isAvailable ? { scale: 1.05, y: -5 } : {}}
                                    whileTap={isAvailable ? { scale: 0.9 } : {}}
                                    onClick={() => handleDayClick(day, isAvailable)}
                                    className={`relative  rounded-2xl flex items-center justify-center transition-all duration-300 border-2 font-black 
    ${isAvailable
                                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20'
                                            : 'border-transparent text-slate-300 dark:text-slate-700 pointer-events-none'}
    ${isSelected
                                            ? '!bg-emerald-500 !border-emerald-400 !text-white scale-110 shadow-xl shadow-emerald-500/40 z-10'
                                            : ''}
`}
                                >
                                    <span className="relative  z-10">{day}</span>

                                    {/* أيقونة التوفر الصغيرة */}
                                    {isAvailable && !isSelected && (
                                        <div className="absolute top-2 right-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></div>
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Footer Footer خفيف */}
            {!daysLoading && (
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">مواعيد متاحة</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">غير متاح</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;