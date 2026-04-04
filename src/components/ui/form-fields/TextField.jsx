import { Field, ErrorMessage } from "formik";

export default function TextField({
    name,
    label,
    icon: Icon,
    type = "text",
    placeholder,
    extraRight,
    readOnly = false,
    color,
    required = true,
    onChange,
    dark = false,
    ...props
}) {
    const baseInput =
        "w-full px-4 py-3 pr-12 rounded-xl border-2 transition-colors focus:outline-none";

    const lightInput =
        "border-gray-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-[#0A8DBA]";

    const darkInput =
        "border-white/10 bg-slate-950/60 text-white placeholder:text-slate-400 focus:border-[#0FB5A9]";

    const labelStyle = dark
        ? "block text-slate-200 font-bold mb-2"
        : "block text-gray-700 font-bold mb-2";

    const iconStyle = dark ? "text-slate-400" : "text-gray-400";

    return (
        <div>
            <label htmlFor={name} className={labelStyle}>
                {label} {required && "*"}
            </label>

            <div className="relative">
                <Field name={name}>
                    {({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            {...props}
                            onChange={(e) => {
                                field.onChange(e);
                                if (onChange) onChange(e);
                            }}
                            className={`${baseInput} ${dark ? darkInput : lightInput} ${props.className || ""}`}
                        />
                    )}
                </Field>

                {Icon && (
                    <Icon
                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconStyle}`}
                        size={20}
                        color={color}
                    />
                )}

                {extraRight}
            </div>

            <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1 " />
        </div>
    );
}
