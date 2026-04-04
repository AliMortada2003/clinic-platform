import React, { useRef, useState } from "react";
import { ErrorMessage } from "formik";
import { Image as ImageIcon, UploadCloud, Trash2 } from "lucide-react";

export default function CourseCoverUploadField({
    name,
    label,
    accept = "image/*",
    previewImage,
    setPreviewImage,
    setFieldValue,
}) {
    const inputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const pickFile = () => inputRef.current?.click();

    const handleFile = (file) => {
        if (!file) return;

        setFieldValue(name, file);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const onChange = (e) => handleFile(e.target.files?.[0]);
    const removeImage = () => {
        setFieldValue(name, null);
        setPreviewImage(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-bold">{label}</label>}

            <div className="relative border-2 rounded-2xl overflow-hidden">
                {/* الصورة أو placeholder */}
                <div className="aspect-[16/9] w-full bg-slate-100 flex items-center justify-center relative">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="College cover"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div
                            onClick={pickFile}
                            className="flex flex-col items-center justify-center text-slate-400 cursor-pointer"
                        >
                            <ImageIcon size={32} />
                            <p className="text-xs mt-2">اضغط لرفع صورة</p>
                        </div>
                    )}
                </div>

                {/* أزرار رفع/حذف */}
                <div className="absolute top-2 right-2 flex gap-2">
                    {previewImage && (
                        <button
                            type="button"
                            onClick={removeImage}
                            className="flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition"
                        >
                            <Trash2 size={12} /> حذف
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={pickFile}
                        className="flex items-center gap-1 px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-cyan-600 transition"
                    >
                        <UploadCloud size={12} /> {previewImage ? "تغيير" : "رفع"}
                    </button>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={onChange}
                />
            </div>

            <ErrorMessage
                name={name}
                component="p"
                className="text-rose-600 text-xs font-bold mt-1"
            />
        </div>
    );
}
