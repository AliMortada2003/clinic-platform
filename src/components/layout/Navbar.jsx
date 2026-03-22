import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Moon, Sun, User, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // استيراد NavLink
import { useTheme } from '../../context/ThemeContext';
import DoctorLogo from '../Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navLinks = [
    { name: 'الرئيسية', to: '/' },
    { name: 'عن الطبيب', to: '/about' },
    { name: 'حجز موعد', to: '/bookingsystem' },
    { name: 'الاسئلة الشائعه', to: '/faq' },
    { name: 'تواصل معنا', to: '/contact' },
  ];

  // دالة لتنسيق الرابط النشط
  const activeLinkStyle = ({ isActive }) => 
    `relative group font-bold transition-colors ${
      isActive 
      ? 'text-cyan-600 dark:text-cyan-400' 
      : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
    }`;

  return (
    <nav
      className="fixed w-full overflow-hidden z-50 transition-all duration-500 bg-slate-300 dark:bg-slate-800 py-3"
      dir="rtl"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <DoctorLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={activeLinkStyle}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* الخط السفلي يظهر عند الـ Hover أو إذا كان الرابط نشطاً */}
                    <span className={`absolute -bottom-1 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
            {/* Actions - تسجيل الدخول وإنشاء الحساب */}
          <div className="hidden md:flex items-center gap-3">
            {/* زر تغيير الثيم */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-cyan-400 hover:ring-2 ring-cyan-500/50 transition-all shadow-inner ml-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* زر تسجيل الدخول - بستايل شفاف وأنيق */}
            <NavLink to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                تسجيل الدخول
              </motion.button>
            </NavLink>

            {/* زر إنشاء حساب - بستايل المليء والملفت */}
            <NavLink to="/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-600 dark:bg-cyan-500 text-white px-6 py-2.5 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-all"
              >
                <User size={18} />
                إنشاء حساب
              </motion.button>
            </NavLink>
          </div>
          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-cyan-400">
              { isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white p-1">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-300 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2 text-right">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-4 py-4 text-lg font-bold rounded-xl transition-all ${
                    isActive 
                    ? 'bg-cyan-50 dark:bg-slate-800 text-cyan-600' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-slate-800 hover:text-cyan-600'
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 px-4 pb-8">
                {/* زر إنشاء حساب - الأساسي في الموبايل */}
                <NavLink to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-cyan-600 dark:bg-cyan-500 text-white px-6 py-4 rounded-2xl font-black text-lg shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <Users size={20} />
                    إنشاء حساب جديد
                    </button>
                </NavLink>

                {/* زر تسجيل الدخول - بستايل Ghost هادئ */}
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-transparent mt-4 text-slate-700 dark:text-slate-200 px-6 py-4 rounded-2xl font-bold text-lg border border-slate-200 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-800 transition-all">
                    تسجيل الدخول
                    </button>
                </NavLink>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;