import React from "react";
import { Link } from "react-router-dom";
import { LogIn, HeartPulse, ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/form/FormField";
import { useAuth } from './../../hocks/useAuth';
import PasswordField from "../../components/form/PasswordField";

const Login = () => {
    // استدعاء هوك الـ Auth
    const { loginMutation } = useAuth();
    const { mutate: handleLogin } = loginMutation();

    const initialValues = { phone: "", password: "" };

    const validationSchema = Yup.object({
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
            .required("رقم الهاتف مطلوب"),
        password: Yup.string().min(6, "كلمة المرور قصيرة").required("مطلوب"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // نرسل البيانات مباشرة والـ Hook سيتولى إظهار الـ Swal بناءً على النتيجة
        handleLogin(values, {
            onSettled: () => setSubmitting(false)
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">

                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-cyan-600 rounded-2xl mb-4 shadow-lg shadow-cyan-600/20 rotate-3">
                            <HeartPulse className="text-white" size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">تسجيل الدخول</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">مرحباً بك في بوابتك الطبية الآمنة</p>
                    </div>

                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={validationSchema} 
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                <FormField
                                    name="phone"
                                    type="text"
                                    label="رقم الهاتف"
                                    placeholder="01XXXXXXXXX"
                                    icon={Phone}
                                    dir="ltr"
                                />

                                <PasswordField
                                    name="password"
                                    label="كلمة المرور"
                                    placeholder="••••••••"
                                />

                                <div className="flex justify-end">
                                    <button type="button" className="text-xs text-cyan-600 font-bold hover:underline transition-all">
                                        نسيت كلمة المرور؟
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 group text-lg active:scale-[0.98]"
                                >
                                    {isSubmitting ? "جاري التحقق..." : "دخول الحساب"}
                                    {!isSubmitting && <LogIn className="group-hover:translate-x-[-4px] transition-transform" size={20} />}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            ليس لديك حساب؟{" "}
                            <Link to="/register" className="text-cyan-600 font-black hover:underline inline-flex items-center gap-1">
                                إنشاء حساب جديد
                                <ArrowLeft size={14} />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;