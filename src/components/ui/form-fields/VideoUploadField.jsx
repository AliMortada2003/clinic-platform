// src/components/ui/form-fields/VideoUploadField.jsx
import React, { useEffect } from "react"; // أضفنا useEffect
import { ErrorMessage } from "formik";
import { Video, Upload, X, FileVideo } from "lucide-react";

export default function VideoUploadField({
    name,
    label,
    previewVideo,
    setPreviewVideo,
    setFieldValue,
}) {

    // تنظيف الذاكرة عند حذف المكون أو تغيير الفيديو
    useEffect(() => {
        return () => {
            if (previewVideo && previewVideo.startsWith('blob:')) {
                URL.revokeObjectURL(previewVideo);
            }
        };
    }, [previewVideo]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // التحقق من الحجم (مثلاً 500 ميجابايت)
            if (file.size > 500 * 1024 * 1024) {
                alert("حجم الفيديو كبير جداً، الحد الأقصى 500 ميجابايت");
                return;
            }

            setFieldValue(name, file);
            
            // إذا كان هناك فيديو قديم، نحذفه من الذاكرة أولاً
            if (previewVideo && previewVideo.startsWith('blob:')) {
                URL.revokeObjectURL(previewVideo);
            }

            const url = URL.createObjectURL(file);
            setPreviewVideo(url);
        }
    };

    return (
        <div className="mb-2" dir="rtl">
            {label && (
                <label className="flex items-center gap-2 text-slate-700 font-black text-sm mb-3 mr-1">
                    <FileVideo size={16} className="text-[#0A8DBA]" />
                    {label}
                </label>
            )}

            <div className={`relative w-full aspect-video rounded-[2rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                ${previewVideo ? 'border-[#0A8DBA] bg-slate-900 shadow-inner' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#0A8DBA]/30'}`}>

                {previewVideo ? (
                    <div className="relative w-full h-full group">
                        <video
                            src={previewVideo}
                            controls
                            className="w-full h-full object-contain"
                        />
                        {/* زر الحذف مع تأثير ظهور */}
                        <button
                            type="button"
                            onClick={() => {
                                setFieldValue(name, null);
                                setPreviewVideo(null);
                            }}
                            className="absolute top-4 left-4 p-2 bg-red-500/80 backdrop-blur-md text-white rounded-xl hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <label htmlFor={name} className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0A8DBA] mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={28} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black text-slate-700">اضغط لرفع فيديو الحصة</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MP4, WebM (Max 500MB)</p>
                        </div>
                    </label>
                )}

                <input
                    id={name}
                    name={name}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <ErrorMessage name={name} component="p" className="text-red-500 text-[11px] mt-2 mr-2 font-black italic" />
        </div>
    );
}