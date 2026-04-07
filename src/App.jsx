import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from './components/layout/Navbar';
import AppRouter from './router/AppRouter';
import ScrollToTop from "./components/scroll/ScrollToTop";
import Footer from "./sections/FooterSection";
import "./App.css";

// إنشاء الكليانت
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4, // محاولة إعادة الطلب مرة واحدة فقط في حال الفشل
      refetchOnWindowFocus: false, // عدم إعادة الطلب عند تبديل التبويبات
    },
  },
});

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ScrollToTop />
      {/* <Header /> */}
      <main>
        <AppRouter />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
      {/* تظهر فقط في بيئة التطوير */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;