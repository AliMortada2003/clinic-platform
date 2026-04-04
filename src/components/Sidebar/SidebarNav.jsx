// SidebarItem.jsx

import { LogOut } from "lucide-react";
import { useAuth } from "../../hocks/useAuth";
import SidebarItemm from "./SidebarItemm";

const SidebarNav = ({ navItems, themeStyles, collapsed }) => {
    const { logout } = useAuth();
    return (
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
            {navItems?.map((item) => (
                <SidebarItemm key={item.to} {...item} themeStyles={themeStyles} collapsed={collapsed} />
            ))}

            <div className="pt-4 mt-4 border-t border-dashed border-slate-500/10">
                <button onClick={logout} className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all ${collapsed ? "justify-center" : ""}`}>
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-bold">خروج</span>}
                </button>
            </div>
        </div>
    );
};

export default SidebarNav;