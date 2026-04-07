import React from 'react';
import { ArrowLeft, Calendar, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  // الصورة الأساسية (يمكنك تغييرها لأي صورة من الـ 3 التي كنت تستخدمها)
  const heroImage = "https://altusresearch.com/wp-content/uploads/2021/07/shutterstock_1726134715-scaled.jpg";

  return (
    <section className="w-full pt-16 md:pt-20 overflow-hidden" dir="rtl">
      <div className="relative h-[70vh] md:h-[86vh] w-full group overflow-hidden">

        {/* الصورة الخلفية مع تأثير زووم خفيف عند التحميل */}
        <img
          alt="عيادة الدكتور محمد بجراحة القلب"
          className="w-full h-full object-cover transition-transform duration-[10s] scale-105 animate-slow-zoom"
          src={heroImage}
        />

        {/* الطبقة الضبابية والتدرج الأسود (Overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/40 flex items-center justify-center text-right px-6">
          <div className="max-w-4xl w-full text-center md:text-right" dir="rtl">

            {/* شارة علوية - متوافق مع هوية سوهاج */}
            <span className="inline-flex items-center gap-2 bg-cyan-600 text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-cyan-600/20">
              <Activity size={14} />
              رعاية قلبية متكاملة في سوهاج
            </span>

            {/* العنوان */}
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              عيادة دكتور محمد <br />
              <span className="text-cyan-400">لجراحة القلب</span>
            </h1>

            {/* الوصف */}
            <p className="text-gray-200 text-lg md:text-2xl mb-8 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
              أحدث نظم جراحة القلب والصدر والقسطرة التداخلية <br className="hidden md:block" />
              بأحدث التقنيات العالمية في قلب شارع 15.
            </p>

            {/* الأزرار */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <NavLink
                to="/bookingsystem"
                className="group flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-cyan-950 px-10 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-xl shadow-cyan-600/30 active:scale-95"
              >
                <Calendar size={20} />
                احجز موعدك الآن
              </NavLink>

              <NavLink
                to="/contact"
                className="flex items-center gap-2 text-white font-bold hover:text-cyan-400 transition-colors px-6 py-4 group"
              >
                تواصل مع العيادة
                <ArrowLeft className="group-hover:-translate-x-2 transition-transform" size={18} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* إضافة Animation بسيط للزووم في ملف CSS أو Tailwind */}
      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;