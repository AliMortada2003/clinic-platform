import React from 'react';
import { useField } from 'formik';

const FormField = ({ label, icon: Icon, ...props }) => {
    // useField يربط المدخل بـ Formik تلقائياً بناءً على الـ name
    const [field, meta] = useField(props);

    const hasError = meta.touched && meta.error;

    return (
        <div className="space-y-1 w-full">
            {label && (
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <Icon
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 
                        ${hasError ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-cyan-600'}`}
                        size={18}
                    />
                )}
                <input
                    {...field}
                    {...props}
                    className={`w-full bg-slate-100 dark:bg-white/5 border rounded-2xl py-4 pr-12 pl-4 
                    text-slate-900 dark:text-white outline-none transition-all duration-300
                    ${hasError
                            ? 'border-rose-500/50 focus:border-rose-500 shadow-sm shadow-rose-500/10'
                            : 'border-transparent focus:border-cyan-500'
                        }`}
                />
            </div>
            {hasError && (
                <p className="text-rose-500 text-[10px] font-bold mr-2 animate-pulse">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default FormField;