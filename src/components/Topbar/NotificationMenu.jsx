import React, { useState } from "react";
import { Bell, Clock, Calendar } from "lucide-react";

const NotificationMenu = ({ isDark }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(3);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "حجز جديد", message: "قام أحمد علي بحجز موعد جديد", time: new Date(), isRead: false },
        { id: 2, title: "تعديل موعد", message: "تم تغيير موعد كشف الحالة رقم #22", time: new Date(), isRead: false },
    ]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-xl transition-all relative ${isDark ? "hover:bg-white/5 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
            >
                <Bell size={22} className={count > 0 ? "animate-swing" : ""} />
                {count > 0 && (
                    <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white bg-rose-500 ring-2 ring-white dark:ring-slate-900">
                        {count}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className={`absolute left-0 mt-3 w-80 rounded-[2rem] shadow-2xl border z-50 overflow-hidden animate-in zoom-in-95 duration-200
                        ${isDark ? "bg-slate-900 border-white/5" : "bg-white border-slate-100"}`}>

                        <div className={`px-5 py-4 border-b flex justify-between items-center ${isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                            <button className="text-[10px] font-bold text-cyan-500 hover:underline">تعيين كقروء</button>
                            <span className={`text-sm font-black ${isDark ? "text-white" : "text-slate-800"}`}>الإشعارات</span>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <button
                                        key={n.id}
                                        className={`w-full text-right px-5 py-4 border-b transition-all flex flex-col gap-1 
                                            ${isDark ? "border-white/5 hover:bg-white/5" : "border-slate-50 hover:bg-slate-50"}
                                            ${!n.isRead && (isDark ? "bg-cyan-500/5" : "bg-cyan-50/50")}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{n.title}</h4>
                                            {!n.isRead && <span className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{n.message}</p>
                                        <div className="flex gap-3 text-[10px] text-slate-400 mt-2 justify-end font-medium">
                                            <span className="flex items-center gap-1">
                                                {n.time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })} <Clock size={12} />
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {n.time.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })} <Calendar size={12} />
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-10 text-center text-slate-400 text-xs font-bold">لا توجد إشعارات جديدة</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationMenu;