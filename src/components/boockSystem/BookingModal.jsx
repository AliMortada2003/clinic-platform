import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, CheckCircle2, X, Loader2, Calendar, Clock } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedDay, selectedTime, onConfirm, isLoading }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData); // بيبعت البيانات للهوك اللي في الملف الرئيسي
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
                <button onClick={onClose} className="absolute left-6 top-6 text-slate-400 hover:text-cyan-600 transition-colors">
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={40} className="text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">تأكيد بيانات الحجز</h3>

                    <div className="mt-4 flex items-center justify-center gap-4 text-sm font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/50 py-3 rounded-2xl">
                        <span className="flex items-center gap-1"><Calendar size={16} className="text-cyan-600" /> {selectedDay}</span>
                        <span className="flex items-center gap-1"><Clock size={16} className="text-cyan-600" /> {selectedTime}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            required
                            type="text"
                            placeholder="الاسم بالكامل"
                            className="w-full pr-12 pl-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-cyan-500 transition-all border border-transparent focus:border-cyan-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            required
                            type="tel"
                            placeholder="رقم الهاتف"
                            className="w-full pr-12 pl-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-cyan-500 transition-all border border-transparent focus:border-cyan-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-cyan-600 py-5 rounded-2xl text-white font-black text-lg shadow-xl shadow-cyan-500/20 hover:bg-cyan-700 active:scale-95 transition-all flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <><Loader2 className="animate-spin" /> جارٍ الحجز...</>
                        ) : "تأكيد الموعد الآن"}
                    </button>

                    <p className="text-center text-xs text-slate-400 font-medium">
                        بضغطك على تأكيد، أنت توافق على سياسة المواعيد بالعيادة.
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default BookingModal;