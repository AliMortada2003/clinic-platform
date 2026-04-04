import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAvailableDays } from '../../../../hocks/useAvailableDays';

const DayModal = ({ isOpen, onClose, onSave }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { days } = useAvailableDays();

    if (!isOpen) return null;

    // مصفوفة التواريخ المضافة مسبقاً (بصيغة YYYY-MM-DD) لسهولة المقارنة
    const existingDates = days?.map(d => d.date.split('T')[0]) || [];

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        
        // التحقق إذا كان التاريخ مضافاً بالفعل
        if (existingDates.includes(formattedDate)) return;

        setSelectedDate(date);
        onSave({ date: formattedDate, isActive: true });
        onClose();
    };

    // دالة لتحديد الأيام التي يجب تعطيلها
    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            return existingDates.includes(formattedDate);
        }
    };

    // دالة لإضافة ستايل مخصص للأيام (مثل الأيام المضافة مسبقاً)
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            if (existingDates.includes(formattedDate)) {
                return 'already-added-day';
            }
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6" dir="rtl">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-cyan-600/10 rounded-2xl text-cyan-600">
                                <CalendarIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">اختر يوم العمل</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">اضغط على اليوم للإضافة</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    {/* Calendar Wrapper */}
                    <div className="premium-calendar-container" dir="ltr">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            minDate={new Date()}
                            tileDisabled={tileDisabled}
                            tileClassName={tileClassName}
                            locale="ar-EG"
                            next2Label={null}
                            prev2Label={null}
                            prevLabel={<ChevronLeft className="w-5 h-5 text-slate-600 dark:text-cyan-500" />}
                            nextLabel={<ChevronRight className="w-5 h-5 text-slate-600 dark:text-cyan-500" />}
                            className="w-full border-none shadow-none font-sans"
                        />
                    </div>

                    {/* Footer Info */}
                    <div className="mt-6 flex items-center justify-center gap-4 border-t border-slate-100 dark:border-white/5 pt-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
                            <span className="text-[10px] font-bold text-slate-500">مختار</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 opacity-50"></div>
                            <span className="text-[10px] font-bold text-slate-500">مضاف مسبقاً</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .premium-calendar-container .react-calendar {
                    background: transparent;
                    border: none;
                    width: 100%;
                }
                /* تنسيق الأرقام والتواريخ */
                .react-calendar__tile {
                    padding: 14px 8px !important;
                    border-radius: 16px;
                    font-weight: 800;
                    font-size: 0.9rem;
                    color: aqua; /* لون داكن للـ Light Mode */
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                /* الأيام المضافة مسبقاً (Disabled) */
                .react-calendar__tile:disabled {
                    background-color: transparent !important;
                    color: red !important;
                    cursor: not-allowed;
                    position: relative;
                }
                .already-added-day::after {
                    content: '';
                    position: absolute;
                    bottom: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8px;
                    height: 5px;
                    border-radius: full;
                    background-color: #94a3b8;
                }
                /* تأثير الـ Hover */
                .react-calendar__tile:enabled:hover {
                    background: #f8fafc !important;
                    color: #0891b2 !important;
                    transform: translateY(-2px);
                }
                /* اليوم المختار (Active) */
                .react-calendar__tile--active {
                    background: #0891b2 !important;
                    color: white !important;
                    box-shadow: 0 10px 20px -5px rgba(8, 145, 178, 0.4);
                }
                /* التنقل (Navigation) */
                .react-calendar__navigation {
                    margin-bottom: 1rem;
                }
                .react-calendar__navigation button {
                    font-weight: 900;
                    color: #0f172a;
                    border-radius: 12px;
                    transition: background 0.2s;
                }
                .react-calendar__navigation button:enabled:hover {
                    background-color: #f1f5f9;
                }
                /* أيام الأسبوع */
                .react-calendar__month-view__weekdays__weekday {
                    text-decoration: none !important;
                    font-weight: 800;
                    color: #64748b;
                    font-size: 0.75rem;
                    padding-bottom: 1rem;
                }
                abbr[title] {
                    text-decoration: none;
                }

                /* Dark Mode Overrides */
                .dark .react-calendar__tile { color: #f1f5f9; }
                .dark .react-calendar__navigation button { color: #fff; }
                .dark .react-calendar__tile:enabled:hover { background: rgba(255,255,255,0.05) !important; }
                .dark .react-calendar__navigation button:enabled:hover { background: rgba(255,255,255,0.05); }
                .dark .already-added-day::after { background-color: #475569; }
            `}</style>
        </AnimatePresence>
    );
};

export default DayModal;