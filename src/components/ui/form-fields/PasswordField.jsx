import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordField({ name, label, placeholder, dark = false }) {
  const [show, setShow] = useState(false);

  const baseInput =
    "w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all focus:outline-none";

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
        {label}
      </label>

      <div className="relative">
        <Field
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`${baseInput} ${dark ? darkInput : lightInput}`}
        />

        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconStyle}`} size={20} />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className={`
            absolute left-10 top-1/2 -translate-y-1/2 
            ${dark ? "text-slate-400 hover:text-[#0FB5A9]" : "text-gray-400 hover:text-[#0A8DBA]"}
          `}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1 font-bold" />
    </div>
  );
}
