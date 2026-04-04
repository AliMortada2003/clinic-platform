import React from 'react';
import { Phone, Edit3, Trash2, Loader2, AlertCircle, Eye, Calendar } from 'lucide-react';

const PatientTable = ({ patients, isLoading, onEdit, onDelete, onView }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-cyan-500" size={40} />
                <p className="text-slate-500 font-bold tracking-widest">جاري تحميل البيانات...</p>
            </div>
        );
    }

    if (patients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle size={48} className="text-slate-200 mb-4" />
                <h3 className="text-lg font-black text-slate-800 dark:text-white">لا توجد نتائج</h3>
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
            { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
        ];

        // اختيار اللون بناءً على الكود الخاص بالحرف لضمان ثبات اللون لنفس المريض
        const index = char.charCodeAt(0) % colors.length;
        return colors[index];
    };
    return (
        <table className="w-full text-right border-collapse table-fixed min-w-[900px]">
            <thead>
                <tr className="bg-cyan-600 dark:bg-cyan-950 text-slate-50 dark:text-slate-400 text-[10px] md:text-[15px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-white/5">
                    <th className="px-8 py-6 w-[25%]">اسم المريض</th>
                    <th className="px-6 py-6 w-[20%]">رقم الهاتف</th>
                    <th className="px-6 py-6 w-[15%]">النوع</th>
                    <th className="px-6 py-6 w-[15%]">العمر</th>
                    <th className="px-6 py-6 w-[25%] text-center">الإجراءات</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {patients.map((p) => (
                    <tr key={p.patientId} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">

                        {/* 1. عمود الاسم */}
                        <td className="px-8 py-5 border-b border-slate-100 dark:border-0">
                            <div className="flex items-center gap-4">
                                {/* اختيار الستايل بناءً على أول حرف من الاسم الأول */}
                                {(() => {
                                    const style = getAvatarStyle(p.firstName[0]);
                                    return (
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg  shadow-sm transition-transform group-hover:scale-110 duration-300 
                    ${style.bg} ${style.text} ${style.border}`}>
                                            {p.firstName[0]}
                                        </div>
                                    );
                                })()}

                                <div className="flex flex-col">
                                    <h4 className="font-black text-slate-900 dark:text-white text-[15px] group-hover:text-cyan-700 transition-colors">
                                        {p.firstName} {p.lastName}
                                    </h4>
                                    {/* إضافة تلميح بسيط تحت الاسم بيخلي الشكل احترافي أكتر */}
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        ID: #{p.patientId.toString().slice(-5)}
                                    </span>
                                </div>
                            </div>
                        </td>
                        {/* 2. عمود الهاتف */}
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-xs">
                                <Phone size={14} className="text-cyan-500" />
                                <span className="tabular-nums">{p.phoneNumber}</span>
                            </div>
                        </td>

                        {/* 3. عمود النوع */}
                        <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full md:text-[14px] font-black ${p.gender === 'Male' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}>
                                {p.gender === 'Male' ? 'ذكر' : 'أنثى'}
                            </span>
                        </td>

                        {/* 4. عمود العمر */}
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm">
                                <Calendar size={14} className="text-slate-400" />
                                <span>{p.age} سنة</span>
                            </div>
                        </td>

                        {/* 5. عمود الإجراءات */}
                        <td className="px-6 py-5 text-center">
                            <div className="flex justify-center gap-1">
                                <button
                                    onClick={() => onView(p)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                                    title="عرض التفاصيل"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => onEdit(p)}
                                    className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-all"
                                    title="تعديل بيانات"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(p.patientId)}
                                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                                    title="حذف المريض"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PatientTable;