import React from "react";
import { Search, X } from "lucide-react";

/**
 * SearchInput
 * props:
 * - value: string
 * - onChange: (value: string) => void
 * - placeholder?: string
 * - className?: string
 * - inputClassName?: string
 * - showClear?: boolean
 */
export default function SearchInput({
    value,
    onChange,
    placeholder = "ابحث...",
    className = "",
    inputClassName = "",
    showClear = true,
}) {
    const hasValue = Boolean(value?.trim?.());

    return (
        <div className={`relative w-full ${className}`}>
            <input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className={
                    "w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 " +
                    "focus:outline-none focus:border-[#0A8DBA] " +
                    (inputClassName || "")
                }
            />

            {/* Search icon */}
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
            />

            {/* Clear button */}
            {showClear && hasValue && (
                <button
                    type="button"
                    onClick={() => onChange?.("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg
                     hover:bg-slate-100 text-slate-500 flex items-center justify-center"
                    aria-label="مسح البحث"
                    title="مسح"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
