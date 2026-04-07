import React from 'react';
import { X, FileText, Download, Eye, Loader2, Image as ImageIcon, Calendar, Printer } from 'lucide-react';
import { useAttachment } from '../../../../hocks/useAttachment';

const ViewAttachmentsModal = ({ isOpen, onClose, appointment,isPatientView }) => {
    const { attachments, isFetching } = useAttachment(appointment?.id);

    // دالة التحميل الذكي (إجبار المتصفح على التحميل)
    const handleDownload = async (url, fileName) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            // إذا فشل الـ Blob (بسبب CORS)، نفتح الرابط في تبويب جديد كخيار احتياطي
            window.open(url, '_blank');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#0f172a] w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                {/* Header - Cyan-600 */}
                <div className="p-6 flex justify-between items-center bg-cyan-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <ImageIcon size={22} />
                        </div>
                        <div>
                            <h3 className="font-black text-lg leading-tight">سجل المرفقات الطبية</h3>
                            <p className="text-white/70 text-xs font-bold tracking-wide">
                                المريض: {appointment?.patientName || appointment?.guestName}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-transparent min-h-[300px]">
                    {isFetching ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-cyan-600" size={45} />
                            <p className="font-black text-slate-400 text-sm">جاري تحميل سجل المرفقات...</p>
                        </div>
                    ) : attachments && attachments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {attachments.map((file) => (
                                <div key={file.id} className="group bg-white dark:bg-white/5 rounded-[2rem] border border-slate-200 dark:border-white/10 overflow-hidden hover:border-cyan-600/50 transition-all duration-300 shadow-sm hover:shadow-xl">

                                    {/* Preview */}
                                    <div className="relative h-32 bg-slate-200 dark:bg-white/10 overflow-hidden">
                                        {file.filesUrl ? (
                                            <img
                                                src={file.filesUrl}
                                                alt="Medical"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <FileText size={40} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 space-y-3">
                                        <div>
                                            <h4 className="font-black text-sm text-slate-700 dark:text-slate-200 line-clamp-1">
                                                {file.diagnostic || "بدون وصف"}
                                            </h4>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mt-1 uppercase">
                                                <Calendar size={12} />
                                                <span>{new Date(file.createdAt).toLocaleDateString('ar-EG')}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {/* معاينة في تبويب جديد */}
                                            <a
                                                href={file.filesUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-50 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-600 hover:text-white rounded-xl text-[11px] font-black transition-all"
                                            >
                                                <Eye size={14} /> معاينة
                                            </a>

                                            {/* زر التحميل الفعلي */}
                                            <button
                                                onClick={() => handleDownload(file.filesUrl, `medical-report-${file.id}.jpg`)}
                                                className="p-2.5 bg-slate-100 dark:bg-white/5 hover:bg-emerald-500 hover:text-white dark:text-slate-300 rounded-xl transition-all"
                                                title="تحميل"
                                            >
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 font-black">
                            لا توجد مرفقات
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAttachmentsModal;