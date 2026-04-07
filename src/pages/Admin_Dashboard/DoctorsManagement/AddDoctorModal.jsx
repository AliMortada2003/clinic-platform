import React from 'react';
import { Formik, Form } from 'formik';
import { X, User, Phone, MapPin, DollarSign, AlignLeft, UserPlus, ShieldCheck } from 'lucide-react';
import FormField from '../../../components/form/FormField';
import PasswordField from '../../../components/form/PasswordField';

const AddDoctorModal = ({ isOpen, onClose, onAdd }) => {
    if (!isOpen) return null;

    // القيم الابتدائية بناءً على الـ JSON اللي بعته
    const initialValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        bio: "",
        clinicLocation: "",
        assistantPhone: "",
        fees: 0
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#0f172a] w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95">

                {/* Header الموحد باللون الـ Cyan */}
                <div className="p-8 bg-cyan-600 text-white flex justify-between items-center relative overflow-hidden">
                    {/* خلفية زخرفية للمودال */}
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <UserPlus size={28} />
                        </div>
                        <div>
                            <h3 className="font-black text-xl italic leading-none">تسجيل طبيب جديد</h3>
                            <p className="text-cyan-100 text-[10px] font-bold mt-2 uppercase tracking-widest">إنشاء حساب احترافي في النظام</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-all relative z-10">
                        <X size={24} />
                    </button>
                </div>

                {/* بداية الفورميك */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                        // تحويل الـ fees لرقم لضمان توافق الـ API
                        const finalData = { ...values, fees: Number(values.fees) };
                        onAdd(finalData);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-8 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* استخدام المكونات الجاهزة FormField */}
                                <FormField name="firstName" label="الاسم الأول" icon={User} placeholder="Ali" />
                                <FormField name="lastName" label="الاسم الأخير" icon={User} placeholder="Mortada" />

                                <FormField name="phoneNumber" label="رقم الهاتف" icon={Phone} placeholder="01125..." dir="ltr" />
                                <PasswordField name="password" label="كلمة المرور" />

                                <FormField name="clinicLocation" label="موقع العيادة" icon={MapPin} placeholder="Sohag, Egypt" />
                                <FormField name="assistantPhone" label="هاتف المساعد" icon={Phone} placeholder="010..." dir="ltr" />

                                <FormField name="fees" type="number" label="سعر الكشف" icon={DollarSign} />
                                <FormField name="bio" label="النبذة التعريفية" icon={AlignLeft} placeholder="تحدث بإيجاز عن خبرات الطبيب..." />
                            </div>

                            {/* أزرار التحكم */}
                            <div className="flex gap-4 pt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 bg-cyan-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-cyan-600/20 hover:bg-cyan-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2 italic">جاري المعالجة...</span>
                                    ) : (
                                        <>
                                            <ShieldCheck size={20} />
                                            تأكيد وتسجيل الطبيب
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-10 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-[1.5rem] font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
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

export default AddDoctorModal;