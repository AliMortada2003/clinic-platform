import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, Mail, MapPin, Hash, UserCircle, Users } from 'lucide-react';

const ViewPatientModal = ({ isOpen, patient, onClose }) => {
    if (!patient) return null;

    const infoItems = [
        { label: 'الاسم الأول', value: patient.firstName, icon: User },
        { label: 'الاسم الأخير', value: patient.lastName, icon: UserCircle },
        { label: 'رقم الهاتف', value: patient.phoneNumber, icon: Phone },
        { label: 'العمر', value: `${patient.age} عام`, icon: Calendar },
        { label: 'الجنس', value: patient.gender === 'Male' ? 'ذكر' : 'أنثى', icon: Users },
        { label: 'العنوان', value: patient.address || 'غير محدد', icon: MapPin },
        { label: 'الرقم التعريفي', value: `#${patient.patientId}`, icon: Hash },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="relative h-32 bg-gradient-to-l from-cyan-600 to-blue-600 p-6">
                                <button
                                    onClick={onClose}
                                    className="absolute left-6 top-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute -bottom-10 right-8">
                                    <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center border-4 border-white dark:border-slate-900">
                                        <User size={48} className="text-cyan-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-14 p-8">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                        {patient?.firstName} {patient?.lastName}
                                    </h3>
                                    <span className="text-cyan-600 font-bold text-sm">مريض مسجل بالنظام</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {infoItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-cyan-600 shadow-sm">
                                                <item.icon size={18} />
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</span>
                                                <span className="text-slate-700 dark:text-slate-200 font-bold">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-2xl mt-8 hover:opacity-90 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
                                >
                                    إغلاق التفاصيل
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ViewPatientModal;