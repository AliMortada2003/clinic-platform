import { motion } from 'framer-motion';
import { Clock, Lock, Loader2, Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';

const SlotsList = ({
    selectedDayId,
    selectedDayName,
    slots,
    slotsLoading,
    selectedSlotId,
    setSelectedSlotId,
    onConfirmClick
}) => {
    // console.log(slots);
    // حالة عدم اختيار يوم
    if (!selectedDayId) {
        return (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 text-center bg-white/50 dark:bg-slate-900/20">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <CalendarIcon size={32} className="text-slate-400" />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2">المواعيد المتاحة</h4>
                <p className="text-slate-400 text-sm max-w-[200px]">يرجى اختيار يوم من التقويم لعرض الساعات المتاحة</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-xl h-full flex flex-col"
        >
            {/* Header القسم العلوي */}
            <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">ساعات العمل ليوم:</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">{selectedDayName}</h4>
            </div>

            {/* Slots Grid شبكة المواعيد */}
            <div className="grow">
                {slotsLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="animate-spin text-cyan-600" size={32} />
                        <span className="text-slate-400 text-xs">جاري جلب الساعات...</span>
                    </div>
                ) : slots?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {slots.map((slot) => {
                            // التعديل الجوهري هنا: نستخدم slot.id لأنه هو المعرف الفريد للساعة
                            const currentSlotId = slot.id;
                            const isSelected = selectedSlotId === currentSlotId;
                            return (
                                <motion.button
                                    key={currentSlotId}
                                    disabled={!slot.isAvailable}
                                    whileTap={slot.isAvailable ? { scale: 0.95 } : {}}
                                    onClick={() => setSelectedSlotId(currentSlotId)}
                                    className={`relative p-4 rounded-xl  transition-all flex flex-col items-center justify-center gap-1 ${!slot.isAvailable
                                            ? 'bg-slate-200 dark:bg-slate-900/50 border-transparent text-slate-500 dark:text-slate-500 cursor-not-allowed '
                                            : isSelected
                                                ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-cyan-500/50 text-slate-600 dark:text-slate-300'}`}
                                >
                                    {/* الوقت */}

                                    <span className="absolute font-black text-[14px]">{slot.startTime}</span>
                                    {/* الأيقونة في الزاوية */}
                                    <div className="absolute top-2 right-2">
                                        {!slot.isAvailable ? (
                                            <Lock size={14} className="text-red-600" />
                                        ) : (
                                            <div className="relative flex items-center justify-center">
                                                {/* نقطة خضراء صغيرة للإتاحة بدل الساعة الكبيرة عشان الزحمة */}
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 text-sm font-medium italic">لا توجد ساعات متاحة</p>
                    </div>
                )}
            </div>

            {/* Action Button زر التأكيد */}
            <div className="mt-6">
                <button
                    disabled={!selectedSlotId}
                    onClick={onConfirmClick}
                    className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all
                        ${selectedSlotId
                            ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-500/20 hover:bg-cyan-700 hover:-translate-y-1'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed'}
                    `}
                >
                    التالي: بيانات الحجز
                    <ChevronLeft size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default SlotsList;