import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Edit3, Phone, User, MapPin,
    Loader2, Calendar, Fingerprint,
    HeartPulse, Mail, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../hocks/useAuth';

const PatientProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(user)
    // نعتمد على بيانات المريض من الـ Auth أو يمكنك جلبها عبر Hook مخصص
    const patient = user;
    const isLoading = false;

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center bg-slate-50/50 dark:bg-[#0b1120]">
            <Loader2 className="animate-spin text-cyan-600" size={40} />
        </div>
    );

    const fullName = patient?.firstName + " " + patient?.lastName || "مريض جديد";

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6" dir="rtl">
            <div className="bg-white dark:bg-[#0f172a] rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden">

                {/* Banner - العودة لهوية الـ Cyan */}
                <div className="h-32 bg-gradient-to-l from-cyan-600 to-cyan-500 relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>

                <div className="px-8 pb-8">
                    {/* Profile Header Section */}
                    <div className="relative -mt-16 flex flex-col md:flex-row items-end gap-6">
                        <div className="relative group">
                            <img
                                src={`https://ui-avatars.com/api/?name=${fullName}&background=0891b2&color=fff&size=128&bold=true`}
                                className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-[#0f172a] shadow-2xl object-cover bg-white"
                                alt="Patient Profile"
                            />
                            <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-[#0f172a] rounded-full shadow-sm"></span>
                        </div>

                        <div className="flex-1 pb-2 text-right">
                            <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                                {fullName}
                                <ShieldCheck size={20} className="text-cyan-500" />
                            </h1>
                            <p className="text-slate-400 font-bold text-xs mt-1 flex items-center gap-1">
                                <Fingerprint size={14} className="text-cyan-600" />
                                كود المريض المميز: #{patient?.patientId || '---'}
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(`/patient/edit-profile`)}
                            className="mb-2 px-6 py-3.5 bg-cyan-600 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
                        >
                            <Edit3 size={18} /> تعديل البروفايل
                        </button>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* رقم الهاتف */}
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4">
                            <div className="p-3 bg-cyan-100 dark:bg-cyan-600/10 rounded-xl text-cyan-600">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">رقم التواصل</p>
                                <p className="text-sm font-bold dark:text-slate-200" dir="ltr">{patient?.phoneNumber || "غير مسجل"}</p>
                            </div>
                        </div>

                        {/* البريد الإلكتروني */}
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4">
                            <div className="p-3 bg-cyan-100 dark:bg-cyan-600/10 rounded-xl text-cyan-600">
                                <Mail size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black text-slate-400 uppercase">البريد الإلكتروني</p>
                                <p className="text-sm font-bold dark:text-slate-200 truncate">{patient?.email || "لا يوجد بريد"}</p>
                            </div>
                        </div>

                        {/* النوع */}
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4">
                            <div className="p-3 bg-cyan-100 dark:bg-cyan-600/10 rounded-xl text-cyan-600">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">الجنس</p>
                                <p className="text-sm font-bold dark:text-slate-200">{patient?.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10 flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                <Calendar className="text-cyan-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-700 dark:text-slate-300 text-sm">العمر</h3>
                                <p className="text-md text-slate-500 mt-1 font-bold">{patient?.age || "لم يتم التحديد"}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10 flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                <MapPin className="text-cyan-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-700 dark:text-slate-300 text-sm">محل الإقامة</h3>
                                <p className="text-xs text-slate-500 mt-1 font-bold">{patient?.address || "لا يوجد عنوان مسجل"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Medical Notes Section */}
                    <div className="mt-6 p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
                        <h3 className="font-black mb-3 text-slate-700 dark:text-slate-300 italic text-sm flex items-center gap-2">
                            <HeartPulse size={16} className="text-cyan-600" />
                            السجل الطبي والملاحظات
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                            {patient?.medicalHistory || "لا توجد ملاحظات طبية مضافة حالياً. إضافة سجلك الطبي يساعد الأطباء على تقديم رعاية أفضل لك."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfilePage;