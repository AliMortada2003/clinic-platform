// src/components/ui/form-fields/TextareaField.jsx
import { Field, ErrorMessage } from "formik";

export default function TextareaField({
    name,
    label,
    placeholder,
    rows = 4,
}) {
    return (
        <div>
            {/* 1. تم التأكد من htmlFor تطابق id الحقل تماماً */}
            <label 
                htmlFor={name} 
                id={`${name}-label`}
                className="block text-gray-700 mb-2 font-medium"
            >
                {label}
            </label>

            <Field
                as="textarea"
                id={name} // المعرف الأساسي
                name={name}
                rows={rows}
                placeholder={placeholder}
                
                /* 2. إصلاح الخصائص التقنية لإمكانية الوصول */
                aria-labelledby={`${name}-label`} // ربط الحقل بعنوانه
                aria-placeholder={placeholder}    // تحسين تجربة قوارئ الشاشة
                
                className="w-full px-4 py-3 bg-fuchsia-50 rounded-xl border-2 border-gray-200 
                           focus:outline-none focus:border-[#0A8DBA] transition-all resize-none"
            />

            {/* 3. ربط رسالة الخطأ بالحقل (اختياري ولكن محترف) */}
            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-sm mt-1"
            />
        </div>
    );
}