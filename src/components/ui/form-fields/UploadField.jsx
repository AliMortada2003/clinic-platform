import React, { useEffect, useMemo, useState } from "react";
import { useField, ErrorMessage } from "formik";
import { Upload, User, FileText } from "lucide-react";

export default function UploadField({
    name,
    label,
    setFieldValue,
    icon: Icon,
    accept = "image/jpeg,image/jpg,image/png,application/pdf",
}) {
    const [field] = useField(name);
    const [previewUrl, setPreviewUrl] = useState(null);

    const isImage = useMemo(() => {
        if (!field.value) return false;
        if (typeof field.value === "string") return true;
        return field.value.type?.startsWith("image/");
    }, [field.value]);

    useEffect(() => {
        const file = field.value;

        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (typeof file === "string") {
            setPreviewUrl(file);
            return;
        }

        if (!isImage) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [field.value, isImage]);

    return (
        <div className="mb-6">
            <label className="block text-gray-700 mb-4 text-center">
                {label}
            </label>

            <div className="flex justify-center">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0A8DBA]/20 bg-gray-100 flex items-center justify-center">
                        {previewUrl && isImage ? (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-400 flex flex-col items-center gap-1">
                                {field.value && !isImage ? (
                                    <>
                                        <FileText size={42} />
                                        <span className="text-xs">PDF</span>
                                    </>
                                ) : Icon ? (
                                    <Icon size={48} />
                                ) : (
                                    <User size={48} />
                                )}
                            </div>
                        )}
                    </div>

                    <label
                        htmlFor={name}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#0A8DBA] to-[#0FB5A9]
                        rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                    >
                        <Upload className="text-white" size={18} />
                    </label>

                    <input
                        id={name}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setFieldValue(name, file);
                        }}
                    />
                </div>
            </div>

            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-sm text-center mt-2"
            />
        </div>
    );
}
