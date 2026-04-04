import React from 'react';

const InputField = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
    disabled = false,
    required = false
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                    {required && <span className="text-red-500 mr-1">*</span>}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <Icon className="h-4 w-4 text-slate-400" />
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full rounded-xl border ${error ? 'border-red-300' : 'border-slate-300'} 
                        bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        ${Icon ? 'pr-10' : ''}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                />

                {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                )}
            </div>
        </div>
    );
};

export default InputField;