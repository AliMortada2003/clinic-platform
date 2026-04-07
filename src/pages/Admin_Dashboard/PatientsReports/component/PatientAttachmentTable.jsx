import React from 'react';
import { Phone, Loader2, AlertCircle, Calendar, FilePlus2, FolderSearch, Clock } from 'lucide-react';

const PatientAttachmentTable = ({ appointments, isLoading, onAddPrescription, onViewAttachments, isPatientView }) => {

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white dark:bg-slate-900/40 rounded-[2rem]">
                <Loader2 className="animate-spin text-cyan-500" size={40} />
                <p className="text-slate-500 font-black tracking-widest text-sm">جاري جلب سجلات المواعيد...</p>
            </div>
        );
    }

    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900/40 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[3rem]">
                <AlertCircle size={48} className="text-slate-200 mb-4" />
                <h3 className="text-lg font-black text-slate-800 dark:text-white">لا توجد مواعيد مقبولة</h3>
                <p className="text-sm text-slate-400 font-bold mt-1">المواعيد التي يتم قبولها ستظهر هنا</p>
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
        const code = char ? char.charCodeAt(0) : 0;
        const index = code % colors.length;
        return colors[index];
    };

    return (
        <div className="overflow-hidden rounded-[2rem] border border-slate-100 dark:border-white/5 bg-white dark:bg-[#0f172a] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse table-fixed min-w-[1000px]">
                    <thead>
                        <tr className="bg-cyan-600   text-white dark:text-slate-100 text-[14px] font-extrabold uppercase tracking-widest border-b border-slate-100 dark:border-white/5">
                            <th className="px-8 py-6 w-[30%] text-right">المريض</th>
                            <th className="px-6 py-6 w-[20%]">تاريخ وموعد الزيارة</th>
                            <th className="px-6 py-6 w-[18%]">رقم التواصل</th>
                            <th className="px-6 py-6 w-[32%] text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cyan-100 dark:divide-white/5">
                        {appointments.map((app) => {
                            // منطق استخراج الاسم الصحيح (تجنب المسافات الفارغة في patientName)
                            const rawName = (app.patientName && app.patientName.trim() !== "")
                                ? app.patientName
                                : (app.guestName || "مريض مجهول");

                            const displayName = rawName.trim();
                            const firstChar = displayName.charAt(0) || "P";
                            const style = getAvatarStyle(firstChar);

                            return (
                                <tr key={app.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all">
                                    {/* عمود المريض */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg border shadow-sm transition-transform group-hover:scale-105 duration-300 ${style.bg} ${style.text} ${style.border}`}>
                                                {firstChar}
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <h4 className="font-black text-slate-800 dark:text-white text-[14px] truncate">
                                                    {displayName}
                                                </h4>
                                                <span className="text-[10px] text-cyan-600 font-bold tracking-wider">
                                                    رقم الحجز: #{app.id}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* عمود التوقيت */}
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-xs">
                                                <Calendar size={14} className="text-cyan-500" />
                                                {new Date(app.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px]">
                                                <Clock size={12} />
                                                {new Date(app.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </td>

                                    {/* عمود الهاتف */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-xs">
                                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                                                <Phone size={12} className="text-cyan-500" />
                                            </div>
                                            <span className="tabular-nums" dir="ltr">
                                                {app.guestPhone || app.patientPhone || "غير متوفر"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* عمود الإجراءات */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-2">
                                            {!isPatientView && <button
                                                onClick={() => onAddPrescription(app)}
                                                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-black text-[11px] shadow-sm transition-all active:scale-95 whitespace-nowrap"
                                            >
                                                <FilePlus2 size={14} />
                                                إضافة روشتة
                                            </button>
                                            }
                                            <button
                                                onClick={() => onViewAttachments(app)}
                                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-black text-[11px] transition-all whitespace-nowrap"
                                            >
                                                <FolderSearch size={14} className="text-amber-500" />
                                                الأرشيف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientAttachmentTable;