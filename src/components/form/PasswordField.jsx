import React, { useState } from 'react';
import { useField } from 'formik';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordField = ({ label, ...props }) => {
    // حالة للتحكم في ظهور كلمة المرور
    const [showPassword, setShowPassword] = useState(false);

    // ربط الحقل بـ Formik
    const [field, meta] = useField(props);
    const hasError = meta.touched && meta.error;

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-1 w-full text-right" dir="rtl">
            {label && (
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">
                    {label}
                </label>
            )}
            <div className="relative group">
                {/* أيقونة القفل الأساسية (يمين) */}
                <Lock
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 
                    ${hasError ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-cyan-600'}`}
                    size={18}
                />

                <input
                    {...field}
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className={`w-full bg-slate-100 dark:bg-white/5 border rounded-2xl py-4 pr-12 pl-12 
                    text-slate-900 dark:text-white outline-none transition-all duration-300
                    ${hasError
                            ? 'border-rose-500/50 focus:border-rose-500 shadow-sm shadow-rose-500/10'
                            : 'border-transparent focus:border-cyan-500'
                        }`}
                />

                {/* زر العين (يسار) */}
                <button
                    type="button" // مهم جداً لمنع عمل Submit للفورم
                    onClick={togglePassword}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {hasError && (
                <p className="text-rose-500 text-[10px] font-bold mr-2 animate-pulse italic">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default PasswordField;