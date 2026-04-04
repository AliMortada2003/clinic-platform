import React, { useState } from 'react';
import {
    Phone, Calendar, Clock, Check, X,
    Eye, Loader2, AlertCircle, User
} from 'lucide-react';

const AppointmentTable = ({ appointments, isLoading, onChangeStatus, onCancel, onView, activeStatus }) => {

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="relative">
                    <Loader2 className="animate-spin text-cyan-500" size={48} />
                    <div className="absolute inset-0 blur-2xl bg-cyan-500/20 animate-pulse" />
                </div>
                <p className="text-slate-500 font-black tracking-widest animate-pulse text-sm">جاري تحديث سجل المواعيد...</p>
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900/40 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[3rem]">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white">لا توجد حجوزات في هذا القسم</h3>
                <p className="text-sm text-slate-400 font-bold mt-1">جرب تغيير الفلتر أو البحث عن اسم آخر</p>
            </div>
        );
    }

    const getAvatarStyle = (char) => {
        const colors = [
            { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
            { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
            { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
            { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
            { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
            { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
        ];
        const index = char ? char.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };
    console.log(activeStatus)
    return (
        <div className="overflow-x-auto rounded-[1rem] border border-slate-100 dark:border-white/5 bg-white dark:bg-[#0f172a] shadow-sm">
            <table className="w-full text-right border-collapse p-2 table-fixed min-w-[1000px]">
                <thead className={`${activeStatus === "Accepted" ? "bg-emerald-800 dark:bg-emerald-800/40" : activeStatus === "Pending" ? "bg-amber-700 dark:bg-amber-700/30 " : activeStatus === "Canceled" ? "bg-rose-600 dark:bg-rose-600/30" : "bg-indigo-600 "} text-white
`}>                <tr className="bg-slate-50/70 dark:bg-white/5 text-slate-950 dark:text-slate-50 text-[12px] font-black uppercase tracking-widest border-b border-slate-300 dark:border-white/40">
                        <th className="px-8 py-6 w-[25%] text-right">المريض / صاحب الحجز</th>
                        <th className="px-6 py-6 w-[18%]">التوقيت</th>
                        <th className="px-6 py-6 w-[15%] text-center">الحالة</th>
                        <th className="px-6 py-6 w-[17%]">رقم الهاتف</th>
                        <th className="px-6 py-6 w-[25%] text-center">الإجراءات المتوفرة</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    {appointments.map((item) => {
                        const name = item.guestName?.trim() || item.patientName?.trim() || "مريض مجهول";
                        const style = getAvatarStyle(name[0]);
                        const isPending = item.status === 'Pending';

                        // تعريف ألوان الصف بناءً على الحالة
                        const statusRowStyles = {
                            Accepted: 'bg-white dark:bg-emerald-500/[0.03] hover:bg-emerald-100 dark:hover:bg-emerald-500/[0.06]',
                            Canceled: 'bg-rose-50/30 dark:bg-rose-500/[0.03] hover:bg-rose-50/60 dark:hover:bg-rose-500/[0.06]',
                            Pending: 'bg-amber-50/30 dark:bg-amber-500/[0.03] hover:bg-amber-50/60 dark:hover:bg-amber-500/[0.06]'
                        };

                        const currentStatusStyle = statusRowStyles[item.status] || '';

                        return (
                            <tr
                                key={item.id}
                                className={`group transition-all duration-300 ${currentStatusStyle} border-b border-b-cyan-200`}
                            >
                                {/* 1. المريض */}
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-sm group-hover:scale-110 duration-300 ${style.bg} ${style.text} border ${style.border}`}>
                                            {name[0]}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <h4 className="font-black text-slate-800 dark:text-white text-[14px] truncate">
                                                {name}
                                            </h4>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                ID: #{item.id.toString().slice(-6)}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. التوقيت */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-xs">
                                            <Calendar size={14} className="text-cyan-500" />
                                            {new Date(item.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px]">
                                            <Clock size={12} />
                                            {new Date(item.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </td>

                                {/* 3. الحالة */}
                                <td className="px-6 py-5 text-center">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border
                        ${item.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:border-emerald-500/30' :
                                            item.status === 'Canceled' ? 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:border-rose-500/30' :
                                                'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:border-amber-500/30'}`}>
                                        {item.status === 'Accepted' ? 'مقبول' : item.status === 'Canceled' ? 'ملغي' : 'قيد الانتظار'}
                                    </span>
                                </td>

                                {/* 4. الهاتف */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-xs">
                                        <div className="w-7 h-7 rounded-lg bg-white/50 dark:bg-white/5 flex items-center justify-center">
                                            <Phone size={14} className="text-cyan-500" />
                                        </div>
                                        <span className="tabular-nums" dir="ltr">{item.guestPhone || item.patientPhone || "---"}</span>
                                    </div>
                                </td>

                                {/* 5. الإجراءات */}
                                <td className="px-6 py-5">
                                    <div className="flex justify-center gap-2">
                                        {isPending ? (
                                            <>
                                                <button
                                                    onClick={() => onChangeStatus({ aid: item.id, status: 'Accepted' })}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-[11px] shadow-sm transition-all active:scale-95"
                                                >
                                                    <Check size={14} strokeWidth={3} /> قبول
                                                </button>
                                                <button
                                                    onClick={() => onCancel(item.id)}
                                                    className="p-2 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl transition-all"
                                                    title="إلغاء الموعد"
                                                >
                                                    <X size={18} strokeWidth={2.5} />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => onView(item)}
                                                className="flex items-center gap-2 px-5 py-2 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-cyan-500 hover:text-white rounded-xl font-black text-[11px] transition-all group/btn border border-slate-100 dark:border-white/5"
                                            >
                                                <Eye size={14} className="group-hover/btn:animate-pulse" />
                                                تفاصيل
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
};

export default AppointmentTable;