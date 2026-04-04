import React from "react";
import { NavLink } from "react-router-dom";
const SidebarItemm = ({ to, icon: Icon, label, end, themeStyles, collapsed }) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) => `
        group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300
        ${isActive ? `${themeStyles.itemActiveBg} ${themeStyles.itemActiveText}` : themeStyles.itemText}
        ${themeStyles.itemHover}
        ${collapsed ? "justify-center" : "justify-between"}
      `}
        >
            <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all 
          ${collapsed ? "bg-transparent" : "bg-slate-500/5 group-hover:scale-110"}`}>
                    {Icon && <Icon size={20} />}
                </span>
                {!collapsed && <span className="text-sm font-bold animate-in slide-in-from-right-2">{label}</span>}
            </div>
        </NavLink>
    );
};

export default SidebarItemm;