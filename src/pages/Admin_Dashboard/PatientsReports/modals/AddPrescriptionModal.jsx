import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useAttachment } from '../../../../hocks/useAttachment'; // تأكد من صحة مسار الهوك (hocks أو hooks)

const AddPrescriptionModal = ({ isOpen, onClose, appointment }) => {
    const [file, setFile] = useState(null);
    const [diagnostic, setDiagnostic] = useState('');

    // استخدام الهوك الخاص بك
    const { uploadAttachment, isUploading } = useAttachment();

    // تنظيف المدخلات عند إغلاق المودال
    useEffect(() => {
        if (!isOpen) {
            setFile(null);
            setDiagnostic('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // استخراج اسم المريض للعرض
    const displayName = (appointment?.patientName && appointment.patientName.trim() !== "")
        ? appointment.patientName
        : (appointment?.guestName || "مريض مجهول");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file || !diagnostic) return;
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Diagnostic', diagnostic);
        
        uploadAttachment({ appointmentId: appointment?.id, data: formData },

            {
                onSuccess: () => {
                    onClose(); // نغلق المودال فقط عند نجاح العملية
                }
            }
        );
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#0f172a] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-6 flex justify-between items-center bg-cyan-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <FileText size={22} />
                        </div>
                        <div>
                            <h3 className="font-black text-lg leading-tight">إضافة سجل طبي</h3>
                            <p className="text-white/70 text-xs font-bold">للمريض: {displayName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Diagnostic Input */}
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mr-2 uppercase tracking-widest">
                            التشخيص أو الملاحظات الطبية
                        </label>
                        <textarea
                            value={diagnostic}
                            onChange={(e) => setDiagnostic(e.target.value)}
                            required
                            placeholder="اكتب تفاصيل الحالة هنا..."
                            className="w-full h-32 px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-sm font-bold dark:text-white transition-all resize-none placeholder:text-slate-400"
                        />
                    </div>

                    {/* File Upload Area */}
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mr-2 uppercase tracking-widest">
                            المرفق (صورة أو PDF)
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                accept="image/*,.pdf"
                            />
                            <div className={`
                                py-8 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300
                                ${file ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5' : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 group-hover:border-cyan-500/50'}
                            `}>
                                {file ? (
                                    <>
                                        <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                                        <p className="px-4 text-xs font-black text-emerald-600 text-center truncate w-full">
                                            {file.name}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="text-slate-400 group-hover:text-cyan-500 transition-colors" size={32} />
                                        <p className="mt-2 text-xs font-black text-slate-500">
                                            اسحب الملف أو اضغط للاختيار
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={isUploading || !file || !diagnostic}
                        className="w-full py-4.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-3"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>جاري الحفظ...</span>
                            </>
                        ) : (
                            <>
                                <Upload size={18} />
                                <span>تأكيد الرفع والحفظ</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPrescriptionModal;