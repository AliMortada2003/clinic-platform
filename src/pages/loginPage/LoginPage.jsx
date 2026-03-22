import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, HeartPulse, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FormField from "../../components/form/FormField";

const Login = () => {
    const initialValues = { email: "", password: "" };

    const validationSchema = Yup.object({
        email: Yup.string().email("بريد إلكتروني غير صحيح").required("مطلوب"),
        password: Yup.string().min(6, "كلمة المرور قصيرة").required("مطلوب"),
    });

    const onSubmit = (values) => {
        Swal.fire({
            icon: 'success',
            title: 'أهلاً بك مجدداً',
            text: 'جاري تسجيل الدخول إلى ملفك الطبي...',
            timer: 2000,
            showConfirmButton: false,
            confirmButtonColor: '#0891b2',
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-slate-200 dark:bg-slate-900 backdrop-blur-xl border border-slate-300 dark:border-white/10 p-4 md:p-12 rounded-[3rem] shadow-2xl">
                    <div className="text-center mb-5">
                        <div className="inline-flex p-3 bg-cyan-600 rounded-2xl mb-4 shadow-lg shadow-cyan-600/20">
                            <HeartPulse className="text-white" size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">تسجيل الدخول</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">مرحباً بك في بوابتك الطبية الآمنة</p>
                    </div>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form className="space-y-5">
                            <FormField
                                name="email"
                                type="email"
                                label="البريد الإلكتروني"
                                placeholder="example@mail.com"
                                icon={Mail}
                            />

                            <FormField
                                name="password"
                                type="password"
                                label="كلمة المرور"
                                placeholder="••••••••"
                                icon={Lock}
                            />

                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-cyan-600 font-bold hover:underline">
                                    نسيت كلمة المرور؟
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                دخول الحساب
                                <LogIn className="group-hover:translate-x-[-4px] transition-transform" size={20} />
                            </button>
                        </Form>
                    </Formik>

                    <div className="mt-3 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            ليس لديك حساب؟{" "}
                            <Link to="/register" className="text-cyan-600 font-bold hover:underline inline-flex items-center gap-1">
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