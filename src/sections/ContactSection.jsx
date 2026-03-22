import { Send, MapPin, Phone, Clock, Facebook, Instagram, Linkedin, Star, Headphones } from "lucide-react";
import ScrollAnimation from './../helpers/ScrollAnimation';
import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ContactSection = () => {
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [message, setMessage] = useState(null)
    const [typeOption, setTypeOption] = useState(null)
    const data = {
        name: name,
        phone: phone,
        message: message,
        typeOption: typeOption
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // التحقق من الحقول
        if (!data.name || !data.message || !data.typeOption || !data.phone) {
            Swal.fire({
                title: 'تنبيه!',
                text: 'برجاء ملء كافة الحقول أولاً قبل الإرسال',
                icon: 'warning',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#06b6d4', // لون الكيان (Cyan) ليناسب تصميمك
            });
            return;
        }
        // في حالة النجاح
        Swal.fire({
            title: 'تم الإرسال!',
            text: 'تم إرسال الرسالة بنجاح، سنتواصل معك قريباً.',
            icon: 'success',
            confirmButtonText: 'رائع',
            confirmButtonColor: '#06b6d4',
        });
        // هنا تضع كود إرسال البيانات الفعلي (API call)
        console.log("Data Sent:", data);
    }
    return (
        <section
            id="contact"
            className="py-10  transition-colors duration-300"
            dir="rtl">

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* العنوان - مضاف إليه أنميشن من الأعلى */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-4"
                    >
                        <Headphones size={18} />
                        <span>تواصل معنا</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        نحن دائماً <span className="text-cyan-600">بالقرب منك</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        فريقنا الطبي والإداري مستعد للإجابة على جميع استفساراتكم على مدار الساعة
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-stretch max-w-6xl mx-auto">

                    {/* معلومات التواصل (Side 1) */}
                    <ScrollAnimation direction="right" delay={0.2} className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-r-4 border-cyan-500 pr-4">معلومات العيادة</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-xl text-cyan-600">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">موقعنا</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">القاهرة، شارع التحرير، برج الأطباء - الدور الرابع</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl text-green-600">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">اتصل بنا</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm" dir="ltr">+20 112 534 6313</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl text-amber-600">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">ساعات العمل</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">يومياً: 10:00 صباحاً - 09:00 مساءً</p>
                                            <p className="text-rose-500 text-xs mt-1">الجمعة عطلة رسمية</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5">
                                <h4 className="text-gray-800 dark:text-white font-bold mb-4">التواصل الاجتماعي</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-gray-500 hover:bg-cyan-500 hover:text-white transition-all shadow-sm">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-gray-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-gray-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* نموذج حجز الاستشارة (Side 2) */}
                    <ScrollAnimation direction="left" delay={0.4}>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* زخرفة خلفية بسيطة */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>

                            <div className="mb-8 flex flex-col items-center gap-4 text-center">
                                <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-600">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">احجز استشارتك</h3>
                                <p className="text-sm text-gray-500">سنتصل بك لتأكيد الموعد خلال دقائق</p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اسم المريض</label>
                                        <input
                                            type="text"
                                            placeholder="الاسم الكامل"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-gray-50  border border-gray-400 dark:border-white/10 rounded-xl p-4 outline-none focus:border-cyan-500 focus:ring-2 ring-cyan-500/20 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">رقم الهاتف</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="01XXXXXXXXX"
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-gray-50  border border-gray-400 dark:border-white/10 rounded-xl p-4 outline-none focus:border-cyan-500 focus:ring-2 ring-cyan-500/20 transition-all text-sm" dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">نوع الاستشارة / التخصص</label>
                                    <select name="typeOption" onChange={(e) => setTypeOption(e.target.value)} className="w-full bg-gray-50  border border-gray-400 dark:border-white/10 rounded-xl p-4 outline-none focus:border-cyan-500 focus:ring-2 ring-cyan-500/20 transition-all text-sm" >
                                        <option>كشف عام</option>
                                        <option>متابعة دورية</option>
                                        <option>استشارة طبية</option>
                                        <option>حالة طارئة</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ">ملاحظات إضافية (اختياري)</label>
                                    <textarea
                                        rows="3"
                                        placeholder="هل تعاني من أعراض محددة؟"
                                        name="message"
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-gray-50  border border-gray-400 dark:border-white/10 rounded-xl p-4 outline-none focus:border-cyan-500 focus:ring-2 ring-cyan-500/20 transition-all text-sm"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg">
                                    ابعت رسالتك
                                </button>
                            </form>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;