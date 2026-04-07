import React, { useState, useMemo } from 'react';
import { ClipboardPlus, Search, Loader2 } from 'lucide-react';
import { useAppointment } from '../../../hocks/useAppointment';
import PatientAttachmentTable from './../../Admin_Dashboard/PatientsReports/component/PatientAttachmentTable';
import ViewAttachmentsModal from './../../Admin_Dashboard/PatientsReports/modals/ViewAttachmentsModal';
import { useAuth } from '../../../hocks/useAuth';
import PageHeader from './../../Admin_Dashboard/component/PageHeader';

const PatientReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    
    const { user } = useAuth();
    const { getPatientAppointments } = useAppointment();

    // الاستدعاء الصحيح للهوك
    const { data: appointmentsData, isLoading } = getPatientAppointments(user?.patientId);

    // دالة فارغة أو معطلة للمريض لأن المريض لا يضيف روشتات لنفسه
    const handleAddPrescription = null; 

    const handleViewAttachments = (appointment) => {
        setSelectedAppointment(appointment);
        setViewModalOpen(true);
    };

    const handleCloseModals = () => {
        setViewModalOpen(false);
        setSelectedAppointment(null);
    };

    // منطق البحث (الفلترة)
    const filteredAppointments = useMemo(() => {
        const data = appointmentsData || [];
        if (!searchTerm.trim()) return data;
        
        return data.filter(app => 
            app.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [appointmentsData, searchTerm]);

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
            <PageHeader
                title="سجلاتي الطبية"
                description="استعرض الروشتات، نتائج التحاليل، والتقارير الخاصة بزياراتك"
                icon={ClipboardPlus}
            >
                <div className="relative w-full md:w-80">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="بحث باسم الطبيب أو التخصص..."
                        className="pr-12 pl-4 py-3.5 bg-white dark:bg-slate-800/50 dark:text-white border border-slate-200 dark:border-white/5 rounded-[1.5rem] w-full outline-none transition-all text-sm focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                    />
                </div>
            </PageHeader>

            <div className="mt-8 relative min-h-[400px]">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-cyan-600" size={40} />
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                        <PatientAttachmentTable
                            appointments={filteredAppointments}
                            isLoading={isLoading}
                            onAddPrescription={handleAddPrescription} // ممرر كـ null للمريض
                            onViewAttachments={handleViewAttachments}
                            isPatientView={true} // تأكد من دعم الجدول لهذه الخاصية لإخفاء أزرار الإضافة
                        />
                    </div>
                )}
            </div>

            <ViewAttachmentsModal
                isOpen={isViewModalOpen}
                onClose={handleCloseModals}
                appointment={selectedAppointment}
                isPatientView={true}
            />
        </div>
    );
};

export default PatientReportsPage;