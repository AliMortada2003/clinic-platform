import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Phone, UserPlus, HeartPulse, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FormField from "../../components/form/FormField";

const Register = () => {
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        password: ""
    };

    // مخطط التحقق (Validation Schema)
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "الاسم قصير جداً").required("مطلوب"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "رقم هاتف غير صحيح").required("مطلوب"),
        email: Yup.string().email("بريد غير صحيح").required("مطلوب"),
        password: Yup.string().min(8, "يجب أن تكون 8 أحرف على الأقل").required("مطلوب"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        console.log("Registered Data:", values);
        Swal.fire({
            icon: 'success',
            title: 'تم إنشاء الحساب!',
            text: `مرحباً بك دكتور ${values.name} في عائلتنا الطبية`,
            confirmButtonColor: '#0891b2',
        });
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500 " dir="rtl">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="bg-slate-200 dark:bg-slate-900 backdrop-blur-xl border border-slate-300 dark:border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex p-3 bg-cyan-600 rounded-2xl mb-4 shadow-lg shadow-cyan-600/20 rotate-3">
                            <HeartPulse className="text-white" size={30} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">انضم إلينا</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">خطوات بسيطة لتبدأ رحلتك الصحية معنا</p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <FormField
                                    name="name"
                                    label="الاسم الكامل"
                                    placeholder="أدخل اسمك الثلاثي"
                                    icon={User}
                                />

                                <FormField
                                    name="phone"
                                    label="رقم الهاتف"
                                    placeholder="01XXXXXXXXX"
                                    icon={Phone}
                                    dir="ltr"
                                />

                                <FormField
                                    name="email"
                                    type="email"
                                    label="البريد الإلكتروني"
                                    placeholder="name@example.com"
                                    icon={Mail}
                                />

                                <FormField
                                    name="password"
                                    type="password"
                                    label="كلمة المرور"
                                    placeholder="••••••••"
                                    icon={Lock}
                                />

                                {/* زر الإرسال يمتد على العمودين في الشاشات الكبيرة */}
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-600/20 transition-all flex items-center justify-center gap-3 group text-lg"
                                    >
                                        {isSubmitting ? "جاري المعالجة..." : "تأكيد وإنشاء حساب"}
                                        <UserPlus className="group-hover:scale-110 transition-transform" size={22} />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer Links */}
                    <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            مشترك بالفعل؟{" "}
                            <Link to="/login" className="text-cyan-600 font-black hover:underline inline-flex items-center gap-1 transition-all">
                                <ArrowLeft size={16} />
                                تسجيل الدخول
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;