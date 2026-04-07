import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/scroll/ScrollToTop";
import Header from "../components/layout/Navbar";
import Footer from "../sections/FooterSection";
import AppRouter from './AppRouter';
import ChatBot from "../sections/ChatBot";

export const AppContent = () => {
    const location = useLocation(); // ✅ الحصول على المسار الحالي

    // 1. تحديد المسارات التي نريد إخفاء الهيدر والفوتر فيها
    // سيتم إخفاء المكونات إذا كان المسار يبدأ بـ /dashboard أو /admin
    const isDashboard = location.pathname.startsWith("/patient") ||
        location.pathname.startsWith("/admin");

    return (
        <div className="min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <ScrollToTop />

            {/* ✅ عرض الهيدر فقط إذا لم نكن في لوحة التحكم */}
            {!isDashboard && <Header />}

            <main>
                <AppRouter />
                <ChatBot />
            </main>

            {/* ✅ عرض الفوتر فقط إذا لم نكن في لوحة التحكم */}
            {!isDashboard && <Footer />}
        </div>
    );
};