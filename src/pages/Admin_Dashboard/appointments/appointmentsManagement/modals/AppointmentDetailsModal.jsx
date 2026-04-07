import React from 'react';
import { User, Phone, Calendar, Clock, Check, X, Info, Stethoscope, Briefcase } from 'lucide-react';

const AppointmentDetailsModal = ({ isOpen, onClose, item, onChangeStatus, onCancel, isPatientView = false }) => {
    if (!isOpen || !item) return null;

    const isPending = item.status === 'Pending';
    const isAccepted = item.status === 'Accepted';
    const isCanceled = item.status === 'Canceled';

    // تبديل البيانات بناءً على نوع المستخدم
    const displayName = (item.guestName || item.patientName || "مريض مجهول");

    const displaySubInfo = (item.patientPhone || item.guestPhone || "بدون رقم");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="bg-white dark:bg-[#0f172a] w-full max-w-md rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 border border-white/10" dir="rtl">

                {/* Header */}
                <div className="p-6 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-cyan-500/10 text-cyan-600 rounded-xl">
                            <Info size={20} />
                        </div>
                        <div>
                            <h2 className="font-black dark:text-white text-slate-800 text-sm">تفاصيل الموعد</h2>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest">ID: #{item.id.toString().slice(-8)}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition-colors p-2">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        {/* عرض اسم الطبيب أو المريض */}
                        <DetailRow
                            label={"اسم المريض"}
                            value={displayName}
                            icon={isPatientView ? <Stethoscope size={14} /> : <User size={14} />}
                        />

                        {/* عرض التخصص أو الهاتف */}
                        <DetailRow
                            label={"رقم الهاتف"}
                            value={displaySubInfo}
                            isLtr={!isPatientView}
                            icon={<Phone size={14} />}
                        />

                        <DetailRow
                            label="التاريخ"
                            value={new Date(item.date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
                            icon={<Calendar size={14} />}
                        />
                        <DetailRow
                            label="التوقيت"
                            value={new Date(item.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                            icon={<Clock size={14} />}
                        />
                    </div>

                    {/* عرض سبب الإلغاء إن وجد */}
                    {item.cancellationReason && (
                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                            <span className="text-[10px] font-black text-rose-500 block mb-1 uppercase">
                                {isPatientView ? "سبب إلغاء الموعد" : "سبب الإلغاء للمريض"}
                            </span>
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.cancellationReason}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2 pt-4">
                        {/* واجهة الأدمن: أزرار القبول والإلغاء */}
                        {!isPatientView ? (
                            <>
                                {(isCanceled || isPending) && (
                                    <button
                                        onClick={() => { onChangeStatus({ aid: item.id, status: 'Accepted' }); onClose(); }}
                                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Check size={18} strokeWidth={3} /> قبول وتفعيل الحجز
                                    </button>
                                )}

                                {(isAccepted || isPending) && (
                                    <button
                                        onClick={() => { onCancel(item.id); onClose(); }}
                                        className="w-full py-4 bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white text-slate-500 dark:text-slate-400 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <X size={18} strokeWidth={3} /> إلغاء الحجز الحالي
                                    </button>
                                )}
                            </>
                        ) : (
                            /* واجهة المريض: فقط زر إلغاء الموعد إذا لم يكن ملغياً */
                            !isCanceled && (
                                <button
                                    onClick={() => { onCancel(item.id); onClose(); }}
                                    className="w-full py-4 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 border border-rose-100 dark:border-rose-500/20"
                                >
                                    <X size={18} strokeWidth={3} /> إلغاء موعدي
                                </button>
                            )
                        )}

                        <button
                            onClick={onClose}
                            className="w-full py-3 text-slate-400 font-bold text-xs hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            إغلاق النافذة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value, isLtr, icon }) => (
    <div className="flex justify-between items-center p-3.5 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2 text-slate-400">
            <span className="text-cyan-500/60">{icon}</span>
            <span className="text-xs font-bold">{label}:</span>
        </div>
        <span className={`text-sm font-black text-slate-700 dark:text-slate-200 ${isLtr ? 'tracking-wider font-sans' : ''}`} dir={isLtr ? 'ltr' : 'rtl'}>
            {value}
        </span>
    </div>
);

export default AppointmentDetailsModal;