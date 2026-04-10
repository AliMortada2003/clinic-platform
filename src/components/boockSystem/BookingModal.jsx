import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, CheckCircle2, X, Loader2, Calendar, Clock } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from "../../components/form/FormField"; // استدعاء مكونك الجاهز

const BookingModal = ({ isOpen, onClose, selectedDay, selectedTime, onConfirm, isLoading }) => {

    if (!isOpen) return null;

    // 1. قيم البداية
    const initialValues = { name: '', phone: '' };

    // 2. مخطط التحقق (Validation Schema) بنفس منطق مشروعك
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
            // Regex يمنع الأرقام ويقبل الحروف العربية والإنجليزية والمسافات فقط
            .matches(/^[\p{L}\s]+$/u, "الاسم يجب أن يحتوي على حروف فقط")
            .required("الاسم مطلوب لتأكيد الحجز"),
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح (مثال: 01XXXXXXXXX)")
            .required("رقم الهاتف مطلوب"),
    });

    const handleSubmit = (values) => {
        onConfirm(values); // يرسل (name, phone) إلى ملف الحجز الرئيسي
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" dir="rtl">
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

                        <div className="mt-4 flex items-center justify-center gap-4 text-sm font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/50 py-3 rounded-2xl border border-slate-100 dark:border-white/5">
                            <span className="flex items-center gap-1"><Calendar size={16} className="text-cyan-600" /> {selectedDay}</span>
                            <span className="flex items-center gap-1"><Clock size={16} className="text-cyan-600" /> {selectedTime}</span>
                        </div>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                {/* استخدام FormField الجاهز لتوحيد الـ UI */}
                                <FormField
                                    name="name"
                                    type="text"
                                    label="الاسم بالكامل"
                                    placeholder="اكتب اسمك الثلاثي"
                                    icon={User}
                                />

                                <FormField
                                    name="phone"
                                    type="text"
                                    label="رقم الهاتف"
                                    placeholder="01XXXXXXXXX"
                                    icon={Phone}
                                    dir="ltr"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-cyan-600 py-5 rounded-2xl text-white font-black text-lg shadow-xl shadow-cyan-500/20 hover:bg-cyan-700 disabled:bg-slate-400 active:scale-95 transition-all flex justify-center items-center gap-2 group"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="animate-spin" size={20} /> جارٍ تأكيد الحجز...</>
                                    ) : (
                                        <>تأكيد الموعد الآن</>
                                    )}
                                </button>

                                <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed">
                                    بضغطك على تأكيد، أنت توافق على سياسة المواعيد بعيادة الدكتور محمد وسوف يتم إرسال بيانات الحجز في رسالة نصية.
                                </p>
                            </Form>
                        )}
                    </Formik>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;