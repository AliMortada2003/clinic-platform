import React from 'react';
import { ChevronLeft, Clock, Loader2 } from "lucide-react";
import { motion } from 'framer-motion';
import ScheduleSlotCard from '../../pages/Admin_Dashboard/SchedulePage/component/ScheduleSlotCard';

const SlotsList = ({
    selectedDayId,
    selectedDayName,
    slots,
    slotsLoading,
    selectedSlotId,
    setSelectedSlotId,
    onConfirmClick,
    isRegistered,
    isBookingPending
}) => {

    if (!selectedDayId) {
        return (
            <div className="h-full min-h-[450px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 text-center bg-slate-50/50 dark:bg-slate-900/20">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl text-slate-400">
                    <Clock size={28} />
                </div>
                <h4 className="text-slate-900 dark:text-white font-black text-lg mb-2">اختر موعدك</h4>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">ابدأ باختيار اليوم المناسب لعرض الساعات المتاحة</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white dark:border-slate-800 shadow-2xl flex flex-col h-full"
        >
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-cyan-500 rounded-full"></div>
                <div>
                    <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">المواعيد المتاحة</span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">{selectedDayName}</h4>
                </div>
            </div>

            {/* Slots Grid - هنا التعديل الأساسي ليكونوا جنب بعض */}
            <div className="grow overflow-y-auto pr-2 custom-scrollbar">
                {slotsLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-cyan-500" size={32} />
                        <span className="text-slate-400 font-bold text-sm">جاري جلب الساعات...</span>
                    </div>
                ) : slots?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {slots.map((slot) => {
                            const isSelected = selectedSlotId === slot.id;

                            return (
                                <motion.button
                                    key={slot.id}
                                    disabled={!slot.isAvailable || isBookingPending}
                                    onClick={() => setSelectedSlotId(slot.id)}
                                    className="w-full text-right outline-none"
                                >
                                    <ScheduleSlotCard
                                        slot={slot}
                                        user={true}
                                        isSelected={isSelected}
                                    />
                                </motion.button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-slate-400 font-bold italic text-sm">نعتذر، لا توجد ساعات عمل</p>
                    </div>
                )}
            </div>

            {/* Confirm Button */}
            <button
                disabled={!selectedSlotId || isBookingPending}
                onClick={onConfirmClick}
                className={`mt-6 w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95
                    ${selectedSlotId && !isBookingPending
                        ? 'bg-slate-900 dark:bg-cyan-600 text-white shadow-xl'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}
                `}
            >
                {isBookingPending ? (
                    <Loader2 className="animate-spin" size={18} />
                ) : (
                    <>
                        {isRegistered ? "تأكيد الحجز" : "بيانات الحجز"}
                        <ChevronLeft size={18} />
                    </>
                )}
            </button>
        </motion.div>
    );
};

export default SlotsList;