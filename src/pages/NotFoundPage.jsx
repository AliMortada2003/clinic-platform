import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Loader2 } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    // نتحقق من وجود كلاس dark في الـ html لضمان مزامنة حالة اللودر
    const isDark = document.documentElement.classList.contains('dark');

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center p-6 space-y-12 overflow-hidden transition-colors duration-300
            ${isDark ? "bg-[#0b1120]" : "bg-slate-50"}`}>

            {/* القسم البصري (الأيقونات والنيون) */}
            <div className="relative flex items-center justify-center">
                {/* النيون الخلفي (يظهر بوضوح في الدارك مودي) */}
                <div className="absolute inset-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* رقم الـ 404 بستايل احترافي */}
                    <div className="flex items-end gap-1">
                        <span className="text-[140px] font-black leading-none text-cyan-600">4</span>

                        {/* أيقونة تنبيه متحركة بدلاً من الصفر */}
                        <div className="w-24 h-24 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/10">
                            <AlertCircle size={60} className="text-cyan-600" />
                        </div>

                        <span className="text-[140px] font-black leading-none text-cyan-600">4</span>
                    </div>

                    {/* خط ديكوري صغير */}
                    <div className="w-32 h-1.5 bg-cyan-600 rounded-full mt-[-10px]" />
                </div>
            </div>

            {/* القسم النصي (dir="rtl" لعرض النص العربي بشكل صحيح) */}
            <div className="text-center space-y-4 max-w-lg z-10" dir="rtl">
                <h1 className={`text-3xl md:text-4xl font-black transition-colors ${isDark ? "text-white" : "text-slate-800"}`}>
                    عذراً، هذه الصفحة غير موجودة!
                </h1>

                <p className={`text-base font-bold leading-relaxed transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    يبدو أن الرابط الذي حاولت الوصول إليه قديم، أو تم نقله لمكان آخر، أو ربما هناك خطأ في كتابة العنوان. لا تقلق، يمكنك العودة فوراً.
                </p>
            </div>

            {/* زر العودة للصفحة الرئيسية بستايل الكيان (Cyan) */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 px-8 py-4 bg-cyan-600 text-white rounded-[2rem] font-black text-lg transition-all 
                           shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 hover:shadow-cyan-600/30 active:scale-95 z-10"
            >
                <Home size={22} /> العودة للصفحة الرئيسية
            </button>

            {/* شعار العيادة بشكل خفي جداً في الخلفية لإضافة طابع احترافي */}
            <div className={`absolute bottom-6 left-6 font-bold text-xs tracking-widest transition-opacity ${isDark ? "text-white/5" : "text-slate-200"}`}>
                CLINIC PORTAL | 404 ERROR
            </div>
        </div>
    );
};

export default NotFoundPage;