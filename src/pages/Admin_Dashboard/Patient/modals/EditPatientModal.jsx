import React from "react";
import { Formik, Form, Field } from "formik";
import { User, Phone, Calendar, VenusAndMars, X } from "lucide-react";
import FormField from "../../../../components/form/FormField";
import PasswordField from "../../../../components/form/PasswordField";

const EditPatientModal = ({ patient, isOpen, onClose, onUpdate }) => {
    if (!isOpen) return null;

    const initialValues = {
        firstName: patient?.firstName || "",
        lastName: patient?.lastName || "",
        phoneNumber: patient?.phoneNumber || "",
        password: "", 
        gender: patient?.gender || "Male",
        age: patient?.age || ""
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white">تعديل بيانات المريض</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true} // ضروري جداً لتحديث البيانات عند فتح مريض مختلف
                    onSubmit={(values, { setSubmitting }) => {
                        // تحويل العمر لرقم قبل الإرسال للتوافق مع API
                        const finalData = { ...values, age: Number(values.age) };
                        onUpdate(patient.patientId, finalData);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField name="firstName" label="الاسم الأول" icon={User} />
                            <FormField name="lastName" label="الاسم الأخير" icon={User} />
                            <FormField name="phoneNumber" label="رقم الهاتف" icon={Phone} dir="ltr" />
                            <FormField name="age" type="number" label="العمر" icon={Calendar} />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <VenusAndMars size={16} className="text-cyan-500" /> النوع
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Male', 'Female'].map((g) => (
                                        <label key={g} className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <Field type="radio" name="gender" value={g} className="accent-cyan-600" />
                                            <span className="text-sm font-bold dark:text-white">{g === 'Male' ? 'ذكر' : 'أنثى'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <PasswordField name="password" label="كلمة المرور (اختياري)" />

                            <div className="md:col-span-2 pt-6 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={onClose} 
                                    className="px-10 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditPatientModal;