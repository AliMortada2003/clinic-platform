import React from "react";
import { motion } from "framer-motion";

/**
 * مكون احترافي للأنميشن عند السكرول
 * @param {string} variants - نوع الحركة (fade, up, down, left, right)
 * @param {number} delay - تأخير الحركة بالثواني
 */
const ScrollAnimation = ({ children, direction = "up", delay = 0.2, duration = 0.6 }) => {

    // تعريف أنواع الحركات
    const variants = {
        offscreen: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
        },
        onscreen: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: duration,
                delay: delay,
            },
        },
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }} // once: true يعني الأنميشن يشتغل مرة واحدة فقط
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;