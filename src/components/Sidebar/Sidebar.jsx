import React, { useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse, navItems }) => {
  const { isDark } = useTheme();

  // رجعت الـ border في الـ Memo عشان يطبق على الـ aside والـ components اللي جواه
  const t = useMemo(() => ({
    gradient: isDark ? "from-[#0f172a] to-[#1e293b]" : "from-white to-slate-100",
    border: isDark ? "border-white/10" : "border-slate-200", // التحديد الأساسي
    itemActiveBg: isDark ? "bg-cyan-500/20" : "bg-cyan-600",
    itemActiveText: isDark ? "text-cyan-400" : "text-white",
    itemText: isDark ? "text-slate-400" : "text-slate-600",
  }), [isDark]);

  return (
    <aside className={`
            fixed inset-y-0 right-0 z-40 flex flex-col
            bg-gradient-to-b ${t.gradient} border-l ${t.border}
            transition-all duration-300 ease-in-out shadow-2xl
            ${collapsed ? "w-20" : "w-72"}
            ${isOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
        `}>

      {/* زرار الطي العائم - محسّن ومسنتر */}
      {/* زرار الطي الاحترافي - مستطيل مدمج مع الحافة */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCollapse();
        }}
        className={`hidden lg:flex absolute -left-[20px] top-18 h-18 w-7 items-center justify-center 
                bg-white dark:bg-[#1e293b]
                shadow-[ -4px_0_10px_-3px_rgba(0,0,0,0.1)] 
                hover:w-9 hover:-left-[22px] transition-all duration-300 z-50 
                text-slate-400 hover:text-cyan-500 group`}
      >
        <div className="transition-transform duration-300 group-hover:scale-125">
          {collapsed ?
            <ChevronLeft size={30}  strokeWidth={3} className="mr-1" /> :
            <ChevronRight size={30} strokeWidth={3} className="mr-1" />
          }
        </div>

        {/* لمسة جمالية: خط صغير فوق وتحت الأيقونة */}
        <div className="absolute top-2 w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        <div className="absolute bottom-2 w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </button>

      {/* الهيدر مع تمرير الستايل */}
      <SidebarHeader onClose={onClose} themeStyles={t} collapsed={collapsed} />

      {/* منطقة التنقل */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-6">
        <SidebarNav navItems={navItems} themeStyles={t} collapsed={collapsed} />
      </div>

      {/* الفوتر - لو محتاجه يختفي في الـ collapsed مود تقدر تضيف الـ logic جواه */}
      <SidebarFooter themeStyles={t} collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;