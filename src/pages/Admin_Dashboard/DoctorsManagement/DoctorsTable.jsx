import React from 'react';
import { Edit2, Trash2, Phone, MapPin, CheckCircle2, XCircle, Search } from 'lucide-react';

const DoctorsTable = ({ doctors, onEdit, onDelete }) => {
    if (doctors?.length === 0) {
        return (
            <div className="py-20 text-center space-y-3 bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                <div className="inline-block p-4 bg-slate-50 dark:bg-white/5 rounded-full text-slate-300">
                    <Search size={40} />
                </div>
                <p className="text-slate-400 font-black italic">لا يوجد أطباء يطابقون معايير البحث حالياً..</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead >
                        <tr className="bg-cyan-600 text-white md:text-[14px] dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                            <th className="p-6  font-black  uppercase tracking-widest">معلومات الطبيب</th>
                            <th className="p-6  font-black uppercase tracking-widest text-center">سعر الكشف</th>
                            <th className="p-6  font-black  uppercase tracking-widest">الموقع</th>
                            <th className="p-6  font-black uppercase tracking-widest text-center">حالة الحجز</th>
                            <th className="p-6  font-black uppercase tracking-widest text-left">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                        {doctors?.map((doc) => (
                            <tr key={doc.doctorId} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 flex items-center justify-center text-cyan-600 font-black text-xl shadow-inner border border-cyan-600/5 transition-transform group-hover:scale-110">
                                            {doc.firstName?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-black text-slate-800 dark:text-white capitalize text-base">
                                                د. {doc.firstName} {doc.lastName}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                <Phone size={12} className="text-emerald-500" />
                                                <span dir="ltr">{doc.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-center">
                                    <span className="inline-block px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-sm">
                                        {doc.fees} EGP
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2  font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/5">
                                        <MapPin size={14} className="text-cyan-500" />
                                        {doc.clinicLocation || "غير محدد"}
                                    </div>
                                </td>
                                <td className="p-6 text-center">
                                    {doc.isAcceptingAppointments ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 rounded-full text-[10px] font-black italic ring-1 ring-cyan-600/20">
                                            <CheckCircle2 size={12} /> متاح للحجز
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-400 rounded-full text-[10px] font-black italic ring-1 ring-slate-200 dark:ring-white/10">
                                            <XCircle size={12} /> متوقف
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-left">
                                    <div className="flex items-center justify-end gap-2.5">
                                        <button
                                            onClick={() => onEdit(doc)}
                                            className="p-2.5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-600/20 rounded-xl transition-all shadow-sm border border-transparent hover:border-cyan-100"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(doc.doctorId, doc.firstName)}
                                            className="p-2.5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/20 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorsTable;