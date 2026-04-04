import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Save, Users, Timer, Check } from 'lucide-react';

const SlotModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        startTime: '',
        appointmentCount: 1,
    });

    // قائمة مواعيد مقترحة (يمكنك تعديلها حسب الحاجة)
    const suggestedTimes = [
        "10:00", "11:00", "12:00", "13:00", 
        "17:00", "18:00", "19:00", "20:00"
    ];

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!formData.startTime || formData.appointmentCount < 1) return;
        onSave({ ...formData, isAvailable: true });
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-white/10 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8" dir="rtl">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                                <Timer size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white">إضافة موعد جديد</h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    <div className="space-y-6 text-right" dir="rtl">
                        {/* اختيار سريع للوقت */}
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 mr-1">
                                <Clock size={14} className="text-emerald-500" /> مواعيد مقترحة
                            </label>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {suggestedTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, startTime: time })}
                                        className={`py-2 rounded-xl text-sm font-bold transition-all border ${
                                            formData.startTime === time
                                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105'
                                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="relative flex items-center gap-4 py-2">
                                <div className="flex-grow h-px bg-slate-100 dark:bg-white/5"></div>
                                <span className="text-[10px] font-bold text-slate-300 uppercase">أو اختر يدوياً</span>
                                <div className="flex-grow h-px bg-slate-100 dark:bg-white/5"></div>
                            </div>

                            <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="w-full mt-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-white font-bold transition-all text-center"
                            />
                        </div>

                        {/* أقصى عدد للمرضى */}
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 mr-1">
                                <Users size={14} className="text-emerald-500" /> القدرة الاستيعابية
                            </label>
                            <div className="flex items-center gap-3">
                                {[1, 2, 5, 10].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setFormData({ ...formData, appointmentCount: num })}
                                        className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${
                                            formData.appointmentCount === num
                                                ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                        }`}
                                    >
                                        {num === 10 ? '+10' : num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!formData.startTime}
                            className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all active:scale-95 group"
                        >
                            <Save size={20} className="group-hover:rotate-12 transition-transform" />
                            تأكيد وإضافة الموعد
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SlotModal;