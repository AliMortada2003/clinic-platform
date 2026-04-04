import React from 'react';
import { Menu } from 'lucide-react';

const MobileMenuButton = ({ onClick, isDark }) => {
    return (
        <button
            onClick={onClick}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 active:scale-90 lg:hidden
                ${isDark
                    ? "bg-slate-800 border-white/10 text-white hover:bg-slate-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"}`}
        >
            <Menu size={22} />
        </button>
    );
};

export default MobileMenuButton;