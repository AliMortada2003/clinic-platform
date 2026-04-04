import React from 'react';
import { Timer, CheckCircle2, Circle } from 'lucide-react';

const ScheduleSlotCard = ({ slot, isSelected }) => {
    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));

        return new Intl.DateTimeFormat('ar-EG', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const isAvailable = slot.isAvailable;

    return (
        <div className={`group relative w-full transition-all duration-300 rounded-2xl px-4 py-3
            ${isAvailable 
                ? 'bg-white dark:bg-slate-900/20' 
                : 'bg-slate-200 dark:bg-slate-950/10 opacity-50 cursor-not-allowed'} `}>
            
            <div className="flex items-center justify-around gap-3">
                
                {/* الوقت والأيقونة صغرت */}
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors
                        ${isSelected 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600'}`}>
                        <Timer size={20} />
                    </div>
                    
                    <div className="flex flex-col text-right">
                        <h4 className={`text-lg font-bold leading-tight ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-slate-100'}`}>
                            {formatTime(slot.startTime)}
                        </h4>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                            وقت الحجز
                        </span>
                    </div>
                </div>

                {/* الحالة - بلمسة بسيطة */}
                <div className="flex items-center gap-4">
                    {isAvailable ? (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            متاح
                        </div>
                    ) : (
                        <span className="text-[10px] font-bold text-rose-400">مكتمل</span>
                    )}

                    {/* Checkmark صغرت */}
                    <div className={`transition-all duration-300 ${isSelected ? 'text-cyan-500 scale-110' : 'text-slate-200 dark:text-slate-800'}`}>
                        {isSelected ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScheduleSlotCard;