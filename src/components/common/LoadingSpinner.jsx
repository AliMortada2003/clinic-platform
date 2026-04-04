import React from "react";

const LoadingSpinner = ({ message = "جاري تحضير المحتوى..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 animate-in fade-in duration-700">
      
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        
        <div className="absolute w-20 h-20 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full animate-ping opacity-20"></div>

        {/* الحلقة الأساسية بتصميم عصري */}
        <div className="relative w-16 h-16">
          {/* الحلقة الخلفية (Track) */}
          <div className="absolute inset-0 rounded-full border-[4px] border-slate-100"></div>

          {/* الحلقة الملونة المتحركة (Indicator) */}
          <div className="absolute inset-0 rounded-full border-[4px] border-t-blue-600 border-r-cyan-500 border-b-transparent border-l-transparent animate-spin duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"></div>

          {/* نقطة توهج ديناميكية */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
        </div>

        {/* أيقونة الشعار الصغير في المنتصف */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 rotate-45 animate-pulse shadow-sm"></div>
        </div>
      </div>

      {/* منطقة النص */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-slate-50 text-xl font-black tracking-tight">
          {message}
        </h3>
        
        {/* مؤشر النقاط المتحرك بشكل أنيق */}
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:-0.32s]"></span>
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:-0.16s]"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-duration:0.8s]"></span>
        </div>
      </div>

      {/* رسالة فرعية اختيارية لإضفاء طابع احترافي */}
      <p className="text-slate-100 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
        يرجى الانتظار قليلاً
      </p>
    </div>
  );
};

export default LoadingSpinner;