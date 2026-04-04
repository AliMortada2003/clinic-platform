const CustomCalendar = () => {
    const [viewDate, setViewDate] = useState(new Date()); // الشهر المعروض حالياً
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    // للحصول على أيام الشهر
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    // للحصول على ترتيب أول يوم في الشهر (0 = الأحد، 1 = الإثنين...)
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    // لتنسيق التاريخ بدون مشاكل التوقيت العالمي
    const formatLocal = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    // مصفوفة الأيام (الفراغات + أيام الشهر)
    const calendarGrid = [
        ...Array(firstDay).fill(null), // الأيام الفارغة من الشهر السابق
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1) // أيام الشهر الحالي
    ];

    const weekDays = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    return (
        <div className="select-none">
            {/* الأيام (العناوين) */}
            <div className="grid grid-cols-7 mb-4">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-black text-slate-400">
                        {day}
                    </div>
                ))}
            </div>

            {/* شبكة الأيام */}
            <div className="grid grid-cols-7 gap-2">
                {calendarGrid.map((day, index) => {
                    if (!day) return <div key={`empty-${index}`} />; // خلية فارغة

                    const dateStr = formatLocal(year, month, day);
                    const isSelected = formatDate(selectedDate) === dateStr;
                    const hasSchedule = !!daysMap[dateStr];

                    return (
                        <button
                            key={dateStr}
                            onClick={() => handleDateClick(new Date(year, month, day))}
                            className={`
                                h-14 rounded-2xl flex flex-col items-center justify-center relative transition-all
                                ${isSelected
                                    ? 'bg-cyan-600 text-white shadow-lg scale-105 z-10'
                                    : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'}
                            `}
                        >
                            <span className="font-bold text-sm">{day}</span>
                            {hasSchedule && !isSelected && (
                                <div className="absolute bottom-2 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};