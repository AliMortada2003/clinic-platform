import React, { useState } from 'react';
import { 
    User, Phone, Calendar, Clock, Check, X, 
    AlertCircle, Eye, Info, ChevronRight 
} from 'lucide-react';

const AppointmentCard = ({ item, onChangeStatus, onCancel }) => {
    const [showModal, setShowModal] = useState(false);

    const isPending = item.status === 'Pending';
    const isAccepted = item.status === 'Accepted';
    const isCanceled = item.status === 'Canceled';

    // إعدادات الألوان والحالة
    const statusConfig = {
        Accepted: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        Canceled: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
        Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    };

    const borderConfig = {
        Accepted: 'border-r-emerald-500',
        Canceled: 'border-r-rose-500',
        Pending: 'border-r-amber-500'
    };

    return (
        <>
            <div className={`group bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-white/5 p-5 md:p-7 rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center justify-between gap-3 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all border-r-[6px] ${borderConfig[item.status] || borderConfig.Pending}`}>

                {/* بيانات المريض */}
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:text-cyan-600 transition-all duration-500 shadow-sm">
                        <User size={28} />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-lg md:text-xl text-slate-800 dark:text-white tracking-tight">
                                {item.guestName?.trim() || item.patientName?.trim() || "مريض مجهول"}
                            </h3>
                            <span className={`px-3 py-0.5 border rounded-full text-[10px] font-black uppercase tracking-tighter ${statusConfig[item.status] || statusConfig.Pending}`}>
                                {isAccepted ? 'مقبول' : isCanceled ? 'ملغي' : 'قيد الانتظار'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2 font-bold text-sm">
                            <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-600">
                                <Phone size={14} />
                            </div>
                            <span dir="ltr">{(item.guestPhone || item.patientPhone) || "---"}</span>
                        </div>
                    </div>
                </div>

                {/* تفاصيل الموعد */}
                <div className="grid grid-cols-2 lg:flex items-center gap-6 lg:gap-10 py-5 lg:py-0 border-y lg:border-none border-slate-50 dark:border-white/5">
                    <div className="space-y-1.5 text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الكشف</span>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-extrabold text-sm md:text-base">
                            <Calendar size={18} className="text-cyan-500" />
                            {new Date(item.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                        </div>
                    </div>
                    <div className="space-y-1.5 text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الوقت المحدد</span>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-extrabold text-sm md:text-base">
                            <Clock size={18} className="text-cyan-500" />
                            {new Date(item.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    {isPending ? (
                        <>
                            <button
                                onClick={() => onChangeStatus({ aid: item.id, status: 'Accepted' })}
                                className="flex-1 lg:px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs md:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                <Check size={18} strokeWidth={3} /> قبول
                            </button>
                            <button
                                onClick={() => onCancel(item.id)}
                                className="px-5 py-3.5 bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white text-slate-500 dark:text-slate-400 rounded-2xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 group/cancel"
                            >
                                <X size={18} strokeWidth={3} className="group-hover/cancel:rotate-90 transition-transform" />
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setShowModal(true)}
                            className="w-full lg:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-300 text-sm font-black hover:bg-cyan-500 hover:text-white transition-all active:scale-95 group"
                        >
                            <Eye size={18} className="group-hover:animate-pulse" />
                            عرض التفاصيل
                        </button>
                    )}
                </div>
            </div>

            {/* المودال (Details Modal) */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowModal(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="bg-white dark:bg-[#0f172a] w-full max-w-lg rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10" dir="rtl">
                        {/* Header */}
                        <div className="p-8 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-2xl">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 dark:text-white">تفاصيل الحجز</h2>
                                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">بيانات الموعد بالكامل</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 pt-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailCard label="اسم المريض" value={item.guestName || item.patientName} icon={<User size={16}/>} />
                                <DetailCard label="رقم الهاتف" value={item.guestPhone || item.patientPhone || "---"} icon={<Phone size={16}/>} isLtr />
                                <DetailCard label="التاريخ" value={new Date(item.date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })} icon={<Calendar size={16}/>} />
                                <DetailCard label="الوقت" value={new Date(item.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })} icon={<Clock size={16}/>} />
                            </div>

                            {/* زر تغيير الحالة داخل المودال */}
                            <div className="pt-4 border-t border-slate-50 dark:border-white/5 flex flex-col gap-3">
                                {isCanceled ? (
                                    <button 
                                        onClick={() => { onChangeStatus({ aid: item.id, status: 'Accepted' }); setShowModal(false); }}
                                        className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <Check size={18} /> تفعيل الحجز (قبول)
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => { onCancel(item.id); setShowModal(false); }}
                                        className="w-full py-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
                                    >
                                        <X size={18} /> إلغاء الحجز الحالي
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// مكون فرعي للمعلومات داخل المودال
const DetailCard = ({ label, value, icon, isLtr }) => (
    <div className="p-4 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 flex items-start gap-3 transition-hover hover:border-cyan-500/30">
        <div className="mt-1 text-cyan-500">{icon}</div>
        <div>
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-0.5">{label}</span>
            <span className={`text-sm font-bold text-slate-700 dark:text-slate-200 ${isLtr ? 'font-sans' : ''}`} dir={isLtr ? 'ltr' : 'rtl'}>{value}</span>
        </div>
    </div>
);

export default AppointmentCard;