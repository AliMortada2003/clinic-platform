import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import PageSectionHeader from '../components/PageSectionHeader';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "كيف يمكنني حجز موعد في العيادة؟",
      answer: "يمكنك الحجز بسهولة من خلال الضغط على زر 'احجز الآن' في أعلى الموقع، أو الاتصال بنا مباشرة عبر الأرقام الموضحة في سكشن اتصل بنا."
    },
    {
      question: "هل تتوفر خدمات الطوارئ على مدار الساعة؟",
      answer: "نعم، نحن نوفر خطاً ساخناً مخصصاً للحالات القلبية الطارئة يعمل على مدار الساعة طوال أيام الأسبوع لضمان سلامتكم."
    },
    {
      question: "ما هي الفحوصات المطلوبة في الزيارة الأولى؟",
      answer: "عادة ما نفضل إحضار أي تقارير طبية سابقة. في العيادة، نقوم بإجراء رسم قلب (ECG) وفحص سريري شامل لتقييم الحالة بشكل دقيق."
    },
    {
      question: "هل تتعامل العيادة مع شركات التأمين؟",
      answer: "نعم، نحن نتعاقد مع معظم شركات التأمين الكبرى. يرجى مراجعة قائمة الشركات المتعاقد معها في قسم المعلومات أو التواصل مع السكرتارية."
    }
  ];

  return (
    <section
      id="faq"
      className=" py-10  transition-colors duration-300"
      dir="rtl"
    >
      {/* لمسة طبية في الخلفية */}
      <div className="container mx-auto px-4 max-w-7xl">

        {/* header */}
        <PageSectionHeader
          icon={HelpCircle}
          badgeText="لديك استفسار؟"
          title="الأسئلة"
          highlightTitle="الشائعة"
          description="إجابات سريعة على تساؤلاتكم حول خدماتنا الطبية"
          center={true} // اختياري لأن القيمة الافتراضية true
        />


        {/* قائمة الأسئلة */}
        <div className="space-y-4 ">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border  transition-all duration-300 rounded-[2rem] overflow-hidden ${isOpen
                  ? 'border-cyan-200 bg-slate-300 dark:bg-slate-900 shadow-xl shadow-cyan-500/5'
                  : 'border-slate-100 bg-slate-200 dark:bg-slate-900/50 dark:border-slate-800'
                  }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-right outline-none group"
                >
                  <span className={`text-sm md:text-xl font-bold transition-colors ${isOpen ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                    {faq.question}
                  </span>

                  <div className={`p-2 rounded-xl transition-all ${isOpen
                    ? 'bg-cyan-600 text-white rotate-180'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <div className="h-px w-full bg-white dark:bg-slate-800 mb-6"></div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;