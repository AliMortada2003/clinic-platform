import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ChevronLeft, Clock } from "lucide-react";
import ScrollAnimation from "../helpers/ScrollAnimation";
import { NavLink } from "react-router-dom";
import DoctorLogo from "../components/Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navLinks = [
        { name: 'الرئيسية', to: '/' },
        { name: 'عن الطبيب', to: '/about' },
        { name: 'حجز موعد', to: '/bookingsystem' },
        { name: 'الاسئلة الشائعه', to: '/faq' },
        { name: 'تواصل معنا', to: '/contact' },
    ];

    return (
        <footer
            className="relative overflow-hidden border-t border-white/5 bg-[#070c14] text-slate-300"
            dir="rtl"
        >
            {/* خط إضاءة علوي هادئ */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="container max-w-7xl mx-auto px-6 pt-16 pb-8">
                <ScrollAnimation direction="up" duration={0.8}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* العمود الأول: اللوجو والتعريف */}
                        <div className="space-y-6 lg:col-span-1">
                            <DoctorLogo/>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                نسعى لتقديم أفضل خدمة طبية متكاملة باستخدام أحدث التقنيات العالمية، مع الالتزام التام بأعلى معايير الجودة والسلامة لمرضانا.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: <Facebook size={18} />, href: "#" },
                                    { icon: <Instagram size={18} />, href: "#" },
                                    { icon: <Linkedin size={18} />, href: "#" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* العمود الثاني: روابط سريعة */}
                        <div className="lg:pr-4">
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">روابط هامة</h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-2 text-[15px] transition-all duration-300 ${isActive ? "text-cyan-500" : "text-slate-400 hover:text-cyan-400"
                                                }`
                                            }
                                        >
                                            {/* هنا بنستخدم الوظيفة للوصول لـ isActive داخل العناصر */}
                                            {({ isActive }) => (
                                                <>
                                                    <ChevronLeft
                                                        size={14}
                                                        className={`transition-transform duration-300 group-hover:-translate-x-1 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                                            }`}
                                                    />
                                                    {link.name}
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* العمود الثالث: مواعيد العمل */}
                        <div>
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">مواعيد العيادة</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Clock size={18} className="text-cyan-500 shrink-0 mt-1" />
                                    <div className="text-sm">
                                        <p className="text-slate-200">السبت - الخميس</p>
                                        <p className="text-slate-400 mt-1">04:00 مساءً - 10:00 مساءً</p>
                                    </div>
                                </div>
                                <p className="text-[12px] bg-cyan-500/10 text-cyan-500 p-2 rounded border border-cyan-500/20 text-center">
                                    الجمعة: عطلة رسمية
                                </p>
                            </div>
                        </div>

                        {/* العمود الرابع: معلومات الاتصال */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">تواصل معنا</h3>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <MapPin size={18} className="text-cyan-500 shrink-0 mt-1" />
                                <span className="text-xs leading-5 italic">سوهاج - شارع 15 - برج الأطباء</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer">
                                <Phone size={18} className="text-cyan-500 shrink-0" />
                                <span dir="ltr" className="text-sm font-medium hover:text-cyan-400">+20 100 002 5705</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <Mail size={18} className="text-cyan-500 shrink-0" />
                                <span className="text-xs truncate">dr.example@gmail.com</span>
                            </div>
                        </div>

                    </div>
                </ScrollAnimation>

                {/* حقوق النشر */}
                <ScrollAnimation direction="up" delay={0.3}>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px]">
                        <p className="text-slate-500">
                            © {currentYear} جميع الحقوق محفوظة لعيادة <span className="text-slate-300 font-bold">د.محمد</span>
                        </p>
                        <div className="flex gap-6 text-slate-500">
                            <span className="text-[11px]">تم التطوير بواسطة <span className="text-cyan-600">Code Spark</span></span>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </footer>
    );
};

export default Footer;