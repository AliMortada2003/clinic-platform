import React from "react";
import { motion } from "framer-motion";
import {
    Clock,
    PhoneCall,
    MapPin,
    CalendarCheck,
    ShieldAlert,
    Phone,
} from "lucide-react";

const WorkingHours = () => {
    const schedule = [
        {
            days: "السبت - الأربعاء",
            time: "9:00 ص - 12:00 م فقط",
            status: "متاح",
            isOpen: true,
        },
        {
            days: "الخميس",
            time: "9:00 ص - 12:00 م فقط",
            status: "متاح",
            isOpen: true,
        },
        {
            days: "الخميس",
            time: "9:00 ص - 12:00 م فقط",
            status: "متاح",
            isOpen: true,
        },
        {
            days: "الخميس",
            time: "9:00 ص - 12:00 م فقط",
            status: "متاح",
            isOpen: true,
        },
        {
            days: "الخميس",
            time: "9:00 ص - 12:00 م فقط",
            status: "متاح",
            isOpen: true,
        },
        {
            days: "الجمعة",
            time: "عطلة أسبوعية",
            status: "مغلق",
            isOpen: false,
        },
    ];

    return (
        <section
            id="working-hours"
            className=" py-10  transition-colors duration-300"
            dir="rtl"
        >
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* العناوين الرئيسية */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-4"
                    >
                        <Clock size={18} />
                        <span>مواعيدنا</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        ساعات <span className="text-cyan-600">العمل</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        نحن هنا لاستقبالكم وتقديم الرعاية في الأوقات التالية
                    </p>
                </div>
                {/* 🗓️ قائمة المواعيد (الجزء الأيمن) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex-[2] w-full bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-5 rounded-2xl transition-all duration-300 bg-slate-300 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:shadow-lg hover:shadow-cyan-500/5 group"
                            >
                                {/* الحالة (Badge) */}
                                <div
                                    className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tight ${item.isOpen
                                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        : "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                                        }`}
                                >
                                    {item.status}
                                </div>

                                {/* النصوص والأيقونة */}
                                <div className="flex items-center gap-4 text-right">
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-800 dark:text-slate-100 text-base md:text-lg leading-tight">
                                            {item.days}
                                        </span>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-bold mt-1">
                                            {item.time}
                                        </span>
                                    </div>

                                    <div
                                        className={`p-2.5 rounded-xl transition-colors ${item.isOpen
                                            ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
                                            : "bg-rose-50 text-rose-500 dark:bg-rose-500/10"
                                            }`}
                                    >
                                        <Clock
                                            size={22}
                                            className={item.isOpen ? "animate-pulse-slow" : ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkingHours;
