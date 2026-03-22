import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ArrowLeft, Calendar, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroSlider = () => {
  // 3 صور طبية مختلفة مع ثبات المحتوى
  const slides = [
    { id: 1, image: "https://zotzklimas.de/wp-content/uploads/2022/03/AdobeStock_293113129.jpeg" },
    { id: 2, image: "https://altusresearch.com/wp-content/uploads/2021/07/shutterstock_1726134715-scaled.jpg" },
    { id: 3, image: "https://zotzklimas.de/wp-content/uploads/2022/03/AdobeStock_293113129.jpeg" }
  ];

  return (
    <section className="w-full pt-16 md:pt-20 overflow-hidden" dir="rtl">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[70vh] md:h-[86vh] w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden group">
              {/* الصورة مع زووم بطيء */}
              <img
                alt="دكتور محمد"
                className="w-full h-full object-cover transition-transform duration-[10s] scale-100 group-hover:scale-150"
                src={slide.image}
              />

              {/* الطبقة الضبابية والتدرج الأسود */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/40 flex items-center justify-center text-right px-6">
                <div className="max-w-4xl w-full text-center md:text-right" dir="rtl">

                  {/* شارة علوية */}
                  <span className="inline-flex items-center gap-2 bg-cyan-600 text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full mb-4 animate-bounce">
                    <Activity size={14} />
                    وصل حديثاً
                  </span>

                  {/* العنوان ثابت */}
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                    عيادة دكتور محمد الطبية
                  </h2>

                  {/* الوصف ثابت */}
                  <p className="text-gray-200 text-lg md:text-2xl mb-8 font-medium max-w-2xl mx-auto md:mx-0">
                    متخصصة في جراحة القلب
                  </p>

                  {/* الأزرار */}
                  <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                    <NavLink
                      to="/bookingsystem"
                      className="group flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-cyan-950 px-8 py-4 rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-xl shadow-cyan-600/20 active:scale-95"
                    >
                      <Calendar size={20} />
                      احجز الان
                    </NavLink>

                    <NavLink
                      to="/contact"
                      className="flex items-center gap-2 text-white font-bold hover:text-cyan-400 transition-colors px-6 py-4"
                    >
                      تواصل معنا
                      <ArrowLeft className="rotate-0" size={18} />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تنسيق نقاط التنقل (Cyan Style) */}
      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #0891b2 !important; /* Cyan-600 */
          opacity: 1;
          width: 32px !important;
          border-radius: 4px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;