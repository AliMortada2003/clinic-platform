import React, { useState, useMemo, useEffect } from 'react';
import {
    Clock, Plus, Trash2, Loader2,
    Timer, CheckCircle2, XCircle, ChevronLeft, ChevronRight, MousePointer2
} from 'lucide-react';
import Swal from 'sweetalert2';

import { useAvailableDays } from '../../../hocks/useAvailableDays';
import { useSlots } from '../../../hocks/useSlots';
import PageHeader from '../component/PageHeader';
import ScheduleSlotCard from './component/ScheduleSlotCard';

// Modals
import SlotModal from './modals/SlotModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

const SchedulePage = () => {
    // States
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDayId, setSelectedDayId] = useState(null);

    // Modals States
    const [slotModal, setSlotModal] = useState({ isOpen: false, data: null });
    const [deleteConfig, setDeleteConfig] = useState({ isOpen: false, onConfirm: () => { }, title: '', message: '' });

    // Data Hooks
    const { days, isLoading: daysLoading, addDay, activateDay, cancelDay, deleteDay } = useAvailableDays();
    const { slots, isLoading: slotsLoading, addSlot, deleteSlot } = useSlots(selectedDayId);

    // دالة تنسيق التاريخ بشكل ISO محلي (YYYY-MM-DD)
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString('en-CA'); // تعطي YYYY-MM-DD بشكل مضمون
    };

    // تحويل الأيام إلى Map لسهولة الوصول
    const daysMap = useMemo(() => {
        const map = {};
        days?.forEach(day => {
            const dateStr = day.date.split('T')[0];
            map[dateStr] = day;
        });
        return map;
    }, [days]);

    // الحصول على بيانات اليوم المختار حالياً
    const currentDayData = useMemo(() => {
        return daysMap[formatDate(selectedDate)] || null;
    }, [daysMap, selectedDate]);

    // تحديث selectedDayId عند تغيير التاريخ أو تحديث البيانات
    useEffect(() => {
        const dateStr = formatDate(selectedDate);
        if (daysMap[dateStr]) {
            setSelectedDayId(daysMap[dateStr].id);
        } else {
            setSelectedDayId(null);
        }
    }, [daysMap, selectedDate]);

    // حسابات التقويم
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const calendarGrid = useMemo(() => {
        const grid = [];
        for (let i = 0; i < firstDayIndex; i++) grid.push(null);
        for (let i = 1; i <= daysInMonth; i++) grid.push(i);
        return grid;
    }, [year, month, firstDayIndex, daysInMonth]);

    const changeMonth = (offset) => {
        setViewDate(new Date(year, month + offset, 1));
    };

    const handleDaySelect = async (day) => {
        const newDate = new Date(year, month, day);
        const dateStr = formatDate(newDate);
        setSelectedDate(newDate);

        if (!daysMap[dateStr]) {
            const result = await Swal.fire({
                title: 'إضافة يوم عمل؟',
                text: `هل تريد فتح جدول مواعيد ليوم ${newDate.toLocaleDateString('ar-EG')}؟`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0891b2',
                confirmButtonText: 'نعم، أضف',
                cancelButtonText: 'إلغاء',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                try {
                    // ننتظر إضافة اليوم لنحصل على الـ ID الجديد
                    const response = await addDay({ date: dateStr, isActive: true });
                    // إذا كانت الـ Hook ترجع البيانات مباشرة، نحدث الـ ID
                    if (response?.id) setSelectedDayId(response.id);
                } catch (error) {
                    console.error("Error adding day:", error);
                }
            }
        }
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
            <PageHeader title="تنظيم المواعيد" description="إدارة أيام العمل والساعات المتاحة" icon={Timer} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">

                {/* الجانب الأيمن: التقويم */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-slate-800 dark:text-white text-lg">
                                {viewDate.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-cyan-600 transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-cyan-600 transition-colors">
                                    <ChevronLeft size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 mb-4">
                            {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(d => (
                                <div key={d} className="text-center text-[11px] font-black text-slate-400 uppercase tracking-wider">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-2">
                            {calendarGrid.map((day, idx) => {
                                if (!day) return <div key={`empty-${idx}`} />;

                                const currentLoopDate = new Date(year, month, day);
                                const dateStr = formatDate(currentLoopDate);
                                const isSelected = formatDate(selectedDate) === dateStr;
                                const hasData = !!daysMap[dateStr];
                                const isPast = currentLoopDate < new Date().setHours(0, 0, 0, 0);

                                return (
                                    <button
                                        key={dateStr}
                                        disabled={isPast}
                                        onClick={() => handleDaySelect(day)}
                                        className={`h-14 w-full flex flex-col items-center justify-center rounded-2xl  relative transition-all duration-200 ${isSelected
                                                ? 'bg-cyan-600 text-white shadow-lg scale-110 z-10 font-black'
                                                : hasData
                                                    ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 font-black'
                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold'}
        ${isPast ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
                                    >
                                        <span className="text-sm z-10">{day}</span>

                                        {/* تأثير إضافي اختياري: توهج خفيف خلف الرقم للأيام التي بها بيانات */}
                                        {hasData && !isSelected && (
                                            <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl animate-pulse" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* تفاصيل اليوم المختار */}
                    {selectedDayId && currentDayData && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-6 rounded-[2.5rem] shadow-sm animate-in zoom-in-95">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-black text-slate-800 dark:text-white text-lg">
                                        {selectedDate.toLocaleDateString('ar-EG', { weekday: 'long' })}
                                    </h4>
                                    <p className="text-slate-400 text-sm font-bold">
                                        {selectedDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => currentDayData.isAvailable ? cancelDay(selectedDayId) : activateDay(selectedDayId)}
                                        className={`p-3 rounded-2xl transition-all ${currentDayData.isAvailable ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}
                                    >
                                        {currentDayData.isAvailable ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfig({
                                            isOpen: true,
                                            title: 'حذف يوم عمل',
                                            message: 'سيتم حذف هذا اليوم بجميع ساعاته، هل أنت متأكد؟',
                                            onConfirm: async () => {
                                                await deleteDay(selectedDayId);
                                                setSelectedDayId(null);
                                                setDeleteConfig(prev => ({ ...prev, isOpen: false }));
                                            }
                                        })}
                                        className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* الجانب الأيسر: الساعات */}
                <div className="lg:col-span-7">
                    {selectedDayId ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-cyan-600/10 rounded-2xl text-cyan-600"><Clock size={24} /></div>
                                    <div>
                                        <h3 className="font-black text-slate-800 dark:text-white">الساعات المتاحة</h3>
                                        <p className="text-xs text-slate-400 font-bold uppercase">إدارة فترات الحجز</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSlotModal({ isOpen: true, data: null })}
                                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95"
                                >
                                    <Plus size={18} strokeWidth={3} /> إضافة ساعة
                                </button>
                            </div>

                            {slotsLoading ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-600" /></div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {slots?.length > 0 ? (
                                        slots.map(slot => (
                                            <div key={slot.id} className="relative group">
                                                <ScheduleSlotCard slot={slot} />
                                                <button
                                                    onClick={() => setDeleteConfig({
                                                        isOpen: true,
                                                        title: 'حذف موعد',
                                                        message: 'هل تريد حذف هذه الساعة؟',
                                                        onConfirm: () => {
                                                            deleteSlot(slot.id);
                                                            setDeleteConfig(prev => ({ ...prev, isOpen: false }));
                                                        }
                                                    })}
                                                    className="absolute top-4 left-4 p-1.5 bg-rose-600 text-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-10 text-center bg-slate-50 dark:bg-white/5 rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                                            <p className="text-slate-400 font-bold text-sm">لا توجد ساعات مضافة لهذا اليوم بعد</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-10 border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[4rem]">
                            <div className="p-8 bg-white dark:bg-slate-900 rounded-full shadow-xl mb-6 text-cyan-600">
                                <MousePointer2 size={48} className="animate-bounce" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white">اختر يوماً</h3>
                            <p className="text-slate-400 max-w-[280px] mt-2 font-bold leading-relaxed">
                                اضغط على أي تاريخ في التقويم لبدء إدارة الساعات المتاحة.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <SlotModal
                isOpen={slotModal.isOpen}
                onClose={() => setSlotModal({ isOpen: false, data: null })}
                onSave={(data) => {
                    addSlot({ ...data, available_day_id: selectedDayId });
                    setSlotModal({ isOpen: false, data: null });
                }}
            />

            <DeleteConfirmModal
                isOpen={deleteConfig.isOpen}
                onClose={() => setDeleteConfig({ ...deleteConfig, isOpen: false })}
                onConfirm={deleteConfig.onConfirm}
                title={deleteConfig.title}
                message={deleteConfig.message}
            />
        </div>
    );
};

export default SchedulePage;