import React from "react";
import { Link } from "react-router-dom";
import { User, HeartPulse, ArrowLeft, Phone, UserPlus, Calendar, VenusAndMars } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormField from "../../components/form/FormField";
import PasswordField from "../../components/form/PasswordField";
import { useAuth } from "../../hocks/useAuth";

const Register = () => {
    const { registerMutation } = useAuth();
    const { mutate: handleRegister } = registerMutation();

    const initialValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        gender: "",
        age: ""
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("مطلوب"),
        lastName: Yup.string().required("مطلوب"),
        phoneNumber: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "رقم هاتف غير صحيح")
            .required("مطلوب"),
        password: Yup.string()
            .min(8, "يجب أن تكون 8 أحرف على الأقل")
            .required("مطلوب"),
        gender: Yup.string().required("يرجى اختيار النوع"),
        age: Yup.number()
            .min(1, "عمر غير صحيح")
            .max(100, "عمر غير صحيح")
            .required("مطلوب"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // تحويل العمر لرقم لضمان التوافق مع API
        const finalData = { ...values, age: Number(values.age) };

        handleRegister(finalData, {
            // بنستخدم onSettled عشان نرجع الزرار شغال سواء العملية نجحت أو فشلت
            onSettled: () => setSubmitting(false)
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500" dir="rtl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full relative z-10"
            >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">

                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="inline-flex p-3 bg-cyan-600 rounded-2xl mb-4 shadow-lg shadow-cyan-600/20 rotate-3">
                            <HeartPulse className="text-white" size={30} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">انضم إلينا</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ابدأ رحلتك الصحية مع نظام "التفوق" الطبي</p>
                    </div>

                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={validationSchema} 
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                                <FormField name="firstName" label="الاسم الأول" placeholder="محمد" icon={User} />
                                <FormField name="lastName" label="الاسم الأخير" placeholder="علي" icon={User} />

                                <FormField
                                    name="phoneNumber"
                                    label="رقم الهاتف"
                                    placeholder="01XXXXXXXXX"
                                    icon={Phone}
                                    dir="ltr"
                                />

                                <FormField name="age" type="number" label="العمر" placeholder="25" icon={Calendar} />

                                {/* Gender Selection */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1">
                                        <VenusAndMars size={16} className="text-cyan-500" /> النوع
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['male', 'female'].map((g) => (
                                            <label 
                                                key={g}
                                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all 
                                                ${touched.gender && errors.gender ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'}
                                                hover:bg-slate-50 dark:hover:bg-white/5`}
                                            >
                                                <Field type="radio" name="gender" value={g} className="accent-cyan-600" />
                                                <span className="text-sm font-bold dark:text-white">
                                                    {g === 'male' ? 'ذكر' : 'أنثى'}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {touched.gender && errors.gender && (
                                        <div className="text-red-500 text-[10px] font-bold mt-1">{errors.gender}</div>
                                    )}
                                </div>

                                <PasswordField
                                    name="password"
                                    label="كلمة المرور"
                                    placeholder="••••••••"
                                />

                                <div className="md:col-span-2 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-600/20 transition-all flex items-center justify-center gap-3 group text-lg active:scale-[0.98]"
                                    >
                                        {isSubmitting ? "جاري إنشاء الحساب..." : "تأكيد التسجيل"}
                                        <UserPlus className="group-hover:scale-110 transition-transform" size={22} />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer Section */}
                    <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 text-center font-medium">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            لديك حساب بالفعل؟{" "}
                            <Link to="/login" className="text-cyan-600 font-black hover:underline inline-flex items-center gap-1">
                                <ArrowLeft size={16} /> تسجيل الدخول
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;