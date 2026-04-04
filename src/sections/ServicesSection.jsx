import React from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Activity,
  ClipboardCheck,
  ArrowLeft,
  BookHeadphones,
  HelpCircle,
  StethoscopeIcon
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServicesSlider = () => {
  const services = [
    {
      title: "جراحة القلب المفتوح",
      desc: "عمليات جراحية دقيقة باستخدام أحدث التقنيات لضمان أعلى معدلات الأمان والنجاح.",
      icon: <HeartPulse size={32} />,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      title: "قسطرة القلب التداخلية",
      desc: "علاج انسداد الشرايين وتوسيع الصمامات بدون تدخل جراحي كامل وبأسرع وقت تعافي.",
      icon: <Activity size={32} />,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    {
      title: "الفحوصات الشاملة",
      desc: "فحص دوري كامل يتضمن رسم القلب، السونار، وتحاليل الدم الدقيقة لتقييم صحة القلب.",
      icon: <ClipboardCheck size={32} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "تخطيط صدى القلب (Echo)",
      desc: "تصوير عضلة القلب بالموجات فوق الصوتية لتقييم كفاءة الصمامات وقوة الضخ.",
      icon: <Stethoscope size={32} />,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "علاج اضطراب النبض",
      desc: "تشخيص وعلاج ضربات القلب غير المنتظمة باستخدام أحدث الوسائل الطبية والدوائية.",
      icon: <Microscope size={32} />,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "استشارات ما بعد الجراحة",
      desc: "برنامج متابعة دقيق لضمان تعافي المريض وعودته لممارسة حياته الطبيعية بأمان.",
      icon: <BookHeadphones size={32} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <section
      id="services"
      className=" py-10  transition-colors duration-300"
      dir="rtl"
    >
      <div className="container max-w-7xl mx-auto px-6 relative z-10">

        {/* العناوين */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-4"
          >
            <StethoscopeIcon size={18} />
            <span>رعاية متميزة</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            خدماتنا <span className="text-cyan-600">الطبية</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات الجراحية والعلاجية بأحدث التقنيات العالمية
          </p>
        </div>

        {/* السلايدر */}
        <div className="services-swiper-container relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="h-auto  py-4">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-slate-200 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] text-center shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 border border-white dark:border-slate-800 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow font-medium">
                    {service.desc}
                  </p>

                  {/* Action Button */}
                  <button className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold group/btn text-sm mt-auto">
                    اقرأ المزيد
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;