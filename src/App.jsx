import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./App.css";
import { AppContent } from "./router/AppContent";

// إنشاء الكليانت
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4, // محاولة إعادة الطلب مرة واحدة فقط في حال الفشل
      refetchOnWindowFocus: false, // عدم إعادة الطلب عند تبديل التبويبات
    },
  },
});


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