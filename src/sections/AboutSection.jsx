import React from 'react';
import { Award, BookOpen, Heart, Users, CheckCircle2, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollAnimation from '../helpers/ScrollAnimation';
import PageSectionHeader from '../components/PageSectionHeader';

const AboutSection = () => {
  const stats = [
    { icon: <Users size={22} />, label: 'مريض تم علاجهم', value: '+700' },
    { icon: <Award size={22} />, label: 'سنوات خبرة', value: '+15' },
    { icon: <Heart size={22} />, label: 'عملية جراحية', value: '+200' },
  ];

  return (
    <section
      id="about"
      className="py-20 transition-colors duration-300"
      dir="rtl"
    >
      <div className="container max-w-7xl mx-auto px-6 relative z-10">

        {/* 1. استخدام العنوان الموحد للسكشن */}
        <PageSectionHeader
          icon={Stethoscope}
          badgeText="من نحن"
          title="تعرف على"
          highlightTitle="الدكتور محمد"
          description="خبرة علمية وعملية واسعة في أدق الجراحات الطبية، نجمع بين التكنولوجيا المتطورة واللمسة الإنسانية الحانية."
          center={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* 🖼️ صورة الطبيب مع تصميم خلفي */}
          <ScrollAnimation direction="left" delay={0.2}>
            <div className="relative group">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
                  alt="الدكتور محمد"
                  className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* أشكال زخرفية خلف الصورة */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -z-0 animate-pulse"></div>
              <div className="absolute -top-10 -left-10 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl -z-0"></div>

              {/* بطاقة عائمة للإنجازات فوق الصورة */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 border border-slate-100 dark:border-slate-700 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">زمالة دولية</h4>
                    <p className="text-sm text-slate-500">في جراحات القلب والصدر</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollAnimation>

          {/* 📝 محتوى النص */}
          <ScrollAnimation direction="right">
            <div className="text-right">
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold text-lg mb-4 flex items-center gap-3">
                <span className="w-12 h-0.5 bg-cyan-600"></span>
                رسالة طبية سامية
              </h4>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                نسعى لتقديم رعاية صحية <span className="text-cyan-600 italic">بمعايير عالمية</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed font-medium">
                الدكتور محمد استشاري أول في جراحات القلب المعقدة، كرس حياته المهنية لتقديم أرقى مستويات الرعاية الصحية. يؤمن بأن الطب ليس مجرد مهنة، بل هو رسالة تجمع بين العلم والرحمة لضمان حياة أفضل لكل مريض.
              </p>

              {/* نقاط القوة بتنسيق البطاقات الصغيرة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'جراحات القلب الميكروسكوبية',
                  'متابعة دقيقة على مدار الساعة',
                  'أحدث بروتوكولات العلاج',
                  'استشارات مبنية على البراهين'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border-r-4 border-cyan-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                    <CheckCircle2 className="text-cyan-500" size={18} />
                    <span className="text-slate-700 dark:text-slate-200 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* قسم الإحصائيات (Stats) */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;