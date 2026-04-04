import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, User, LogOut, ChevronDown, Settings, LayoutDashboard } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import DoctorLogo from '../Logo';
import { useAuth } from '../../hocks/useAuth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, userRole } = useAuth();
  console.log(user,isAuthenticated)
  const location = useLocation();
  const menuRef = useRef(null);
  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // إغلاق قائمة الموبايل عند تغيير المسار
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'الرئيسية', to: '/' },
    { name: 'عن الطبيب', to: '/about' },
    { name: 'حجز موعد', to: '/bookingsystem' },
    { name: 'الأسئلة الشائعة', to: '/faq' },
    { name: 'تواصل معنا', to: '/contact' },
  ];

  const activeLinkStyle = ({ isActive }) =>
    `relative group font-bold text-sm transition-colors ${isActive
      ? 'text-cyan-600 dark:text-cyan-400'
      : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
    }`;

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 transition-all duration-300" dir="rtl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <DoctorLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className={activeLinkStyle}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span className={`absolute -bottom-1 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Actions Section */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-cyan-400 hover:ring-2 ring-cyan-500/30 transition-all"
              title={isDark ? "الوضع المضيء" : "الوضع الليلي"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated && user ? (
              /* حالة المستخدم مسجل دخول */
              <div className="relative" ref={menuRef}>
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-right hidden lg:block">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">
                      {userRole === 'Doctor' ? 'طبيب' : 'مريض'}
                    </p>
                    <p className="text-sm font-black text-slate-800 dark:text-white truncate max-w-[120px]">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden py-2"
                    >
                      {(userRole === 'Doctor' || userRole === 'Admin') && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-colors">
                          <LayoutDashboard size={18} /> لوحة التحكم
                        </Link>
                      )}
                      
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <User size={18} /> ملفي الطبي
                      </Link>
                      
                      <hr className="my-2 border-slate-100 dark:border-white/5" />
                      
                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut size={18} /> تسجيل الخروج
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* حالة الزائر */
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <motion.button whileHover={{ scale: 1.02 }} className="text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                    تسجيل الدخول
                  </motion.button>
                </Link>

                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-cyan-600/20"
                  >
                    إنشاء حساب
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-cyan-400">
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30' : 'text-slate-800 dark:text-white'}`}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="px-4 py-6 space-y-2">
              
              {isAuthenticated && user && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest">{userRole === 'Doctor' ? 'الطبيب المختص' : 'مرحباً بك'}</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.to} 
                  className={({ isActive }) => `block px-4 py-4 text-lg font-bold rounded-2xl transition-all ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
                {isAuthenticated ? (
                  <>
                    {(userRole === 'Doctor' || userRole === 'Admin') && (
                      <Link to="/admin/dashboard" className="w-full flex items-center justify-center gap-3 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 p-4 rounded-2xl font-black">
                        <LayoutDashboard size={20} /> لوحة التحكم
                      </Link>
                    )}
                    <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-900/10 text-rose-500 p-4 rounded-2xl font-black">
                      <LogOut size={20} /> تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/login" className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white p-4 rounded-2xl text-center font-bold">دخول</Link>
                    <Link to="/register" className="bg-cyan-600 text-white p-4 rounded-2xl text-center font-black shadow-lg shadow-cyan-600/20">تسجيل</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;