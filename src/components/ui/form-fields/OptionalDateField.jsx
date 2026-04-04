import { useField, useFormikContext } from "formik";

export function OptionalDateTimeField({ name, label, icon: Icon, helper }) {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                {Icon && <Icon size={16} className="text-slate-500" />}
                {label}
            </label>

            <input
                type="datetime-local"
                value={field.value || ""}
                onChange={(e) => setFieldValue(name, e.target.value || "")}
                className={`w-full bg-white rounded-2xl px-4 py-3 text-sm border outline-none transition-all
                    ${meta.touched && meta.error
                        ? "border-rose-300 ring-2 ring-rose-100"
                        : "border-slate-200 focus:border-[#0A8DBA] focus:ring-2 focus:ring-cyan-100"}
                `}
            />

            {meta.touched && meta.error && (
                <p className="text-xs text-rose-600 font-bold">{meta.error}</p>
            )}

            {helper && (
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {helper}
                </p>
            )}
        </div>
    );
}
