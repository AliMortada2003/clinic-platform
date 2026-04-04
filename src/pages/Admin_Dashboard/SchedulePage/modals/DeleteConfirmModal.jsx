import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-white dark:bg-slate-900 max-w-sm w-full rounded-[2.5rem] p-8 text-center shadow-2xl border border-rose-500/20"
                >
                    <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{title}</h3>
                    <p className="text-slate-400 font-medium text-sm mb-8 px-4 leading-relaxed">{message}</p>
                    <div className="grid grid-cols-2 gap-3" dir="rtl">
                        <button onClick={onClose} className="py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-sm hover:bg-slate-200 dark:hover:bg-white/20 transition-all">إلغاء</button>
                        <button onClick={() => { onConfirm(); onClose(); }} className="py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <Trash2 size={18} /> حذف
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteConfirmModal;