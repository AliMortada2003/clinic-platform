import { Lightbulb, CalendarCheck, Clock8, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import PageSectionHeader from '../components/PageSectionHeader';

const AdviceSection = () => {
    const advices = [
        {
            icon: <CalendarCheck className="text-cyan-600" size={32} />,
            title: "اختر موعدك بدقة",
            description: "راجع جدولك جيداً قبل التأكيد. اختيار الموعد المناسب يقلل من حاجتك لإعادة الجدولة لاحقاً."
        },
        {
            icon: <Clock8 className="text-cyan-600" size={32} />,
            title: "الحضور المبكر",
            description: "يفضل تسجيل الحضور قبل الموعد بـ 10 دقائق لضمان البدء في الوقت المحدد دون تأخير."
        },
        {
            icon: <ShieldCheck className="text-cyan-600" size={32} />,
            title: "سياسة الإلغاء",
            description: "إذا طرأ أي ظرف، يرجى إلغاء الحجز أو تعديله قبل 24 ساعة على الأقل لفتح المجال لغيرك."
        },
        {
            icon: <Lightbulb className="text-cyan-600" size={32} />,
            title: "بيانات التواصل",
            description: "تأكد من إدخال رقم هاتف صحيح لنتمكن من إرسال رسالة تأكيد أو التواصل معك في الحالات الطارئة."
        }
    ];

    return (
        <section
            className="py-10  transition-colors duration-300"
            dir="rtl">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <PageSectionHeader
                    icon={Lightbulb}
                    badgeText="إرشادات هامة"
                    title="نصائح لحجز"
                    highlightTitle="ناجح"
                    description="إرشادات بسيطة لضمان أفضل تجربة خدمة وتوفير وقتك"
                    // center={false} // لكي يتناسب مع سياق المحتوى الجانبي أو الداخلي
                />

                <div className="grid grid-cols-2 text-center lg:grid-cols-4 gap-6">
                    {advices.map((advice, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="p-4 rounded-4xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all"
                        >
                            <div className="mb-4">{advice.icon}</div>
                            <p className="text-sm lg:text-xl text-cyan-700 font-bold dark:text-white mb-2">{advice.title}</p>
                            <p className="text-slate-600 dark:text-slate-400 text-[9px] md:text-[14px] leading-relaxed">
                                {advice.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdviceSection;