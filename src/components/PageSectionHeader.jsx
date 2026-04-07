import React from "react";
import { motion } from "framer-motion";

const PageSectionHeader = ({
    icon: Icon,
    badgeText,
    title,
    highlightTitle,
    description,
    center = true // خيار لجعل الهيدر في المنتصف أو على اليمين
}) => {
    return (
        <div className={`${center ? "text-center" : "text-right"} mb-16 space-y-4`}>
            {/* البادج العلوي مع الأنيميشن */}
            {badgeText && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-sm"
                >
                    {Icon && <Icon size={18} />}
                    <span>{badgeText}</span>
                </motion.div>
            )}

            {/* العنوان الرئيسي */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white"
            >
                {title} <span className="text-cyan-600">{highlightTitle}</span>
            </motion.h2>

            {/* الوصف */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`text-slate-500 dark:text-slate-400 font-medium max-w-2xl ${center ? "mx-auto" : ""}`}
                >
                    {description}
                </motion.p>
            )}

            {/* خط ديكوري بسيط أسفل الهيدر (اختياري) */}
            {center && (
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80px" }}
                    className="h-1.5 bg-cyan-600/20 rounded-full mx-auto mt-4"
                />
            )}
        </div>
    );
};

export default PageSectionHeader;