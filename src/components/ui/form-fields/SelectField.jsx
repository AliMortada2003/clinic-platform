import { Field, ErrorMessage } from "formik";

export default function SelectField({
    name,
    label,
    icon: Icon,
    children,
    disabled,
    dark = false,
}) {
    const baseSelect =
        "w-full px-4 py-3 pr-12 rounded-xl border-2 transition-colors focus:outline-none appearance-none";

    const lightSelect =
        "border-gray-200 bg-white text-slate-800 focus:border-[#0A8DBA]";

    const darkSelect =
        "border-white/10 bg-slate-950/60 text-white focus:border-[#0FB5A9]";

    const disabledLight = "bg-gray-100 cursor-not-allowed";
    const disabledDark = "bg-slate-900/60 cursor-not-allowed opacity-70";

    const labelStyle = dark
        ? "block text-slate-200 font-bold mb-2"
        : "block text-gray-700 font-bold mb-2";

    const iconStyle = dark ? "text-slate-400" : "text-gray-400";

    return (
        <div>
            <label htmlFor={name} className={labelStyle}>
                {label} *
            </label>

            <div className="relative">
                <Field
                    as="select"
                    id={name}
                    name={name}
                    disabled={disabled}
                    className={`
            ${baseSelect}
            ${dark ? darkSelect : lightSelect}
            ${disabled ? (dark ? disabledDark : disabledLight) : ""}
          `}
                >
                    {children}
                </Field>

                {Icon && (
                    <Icon
                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconStyle}`}
                        size={20}
                    />
                )}
            </div>

            <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1 font-bold" />
        </div>
    );
}
