import React, { useState, useMemo } from 'react';
import { ClipboardPlus, Search } from 'lucide-react';
import { useAppointment } from '../../../hocks/useAppointment';
import PageHeader from '../component/PageHeader';
import PatientAttachmentTable from './component/PatientAttachmentTable';
import AddPrescriptionModal from './modals/AddPrescriptionModal';
import ViewAttachmentsModal from './modals/ViewAttachmentsModal';

const PatientsReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // جلب البيانات
    const { appointments, isLoading: isAppointmentsLoading } = useAppointment();

    // فلترة المواعيد المقبولة فقط وحسب البحث
    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(app => {
            // التعامل مع الحالة سواء كانت نص "Accepted" أو رقم (مثل 1)
            const isAccepted = app.status === 'Accepted' || app.status === 1;

            // تجميع الاسم بالكامل للبحث (دعم guestName و patientName)
            const fullName = `${app.patientName || app.guestName || ''} ${app.lastName || ''}`.toLowerCase();
            const phone = `${app.patientPhone || app.guestPhone || ''}`;
            const search = searchTerm.toLowerCase();

            return isAccepted && (fullName.includes(search) || phone.includes(search));
        });
    }, [appointments, searchTerm]);

    const handleAddPrescription = (appointment) => {
        setSelectedAppointment(appointment);
        setIsAddModalOpen(true);
    };

    const handleViewAttachments = (appointment) => {
        setSelectedAppointment(appointment);
        setViewModalOpen(true); // تأكد من تفعيل حالة العرض
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setViewModalOpen(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
            <PageHeader
                title="سجلات وتقارير المرضى"
                description="إدارة الأرشيف الطبي، الروشتات، ونتائج التحاليل لكل زيارة"
                icon={ClipboardPlus}
            >
                <div className="relative w-full md:w-80">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="بحث باسم المريض أو الهاتف..."
                        className="pr-12 pl-4 py-3.5 bg-white dark:bg-slate-800/50 dark:text-white border border-slate-200 dark:border-white/5 rounded-2xl w-full outline-none transition-all text-sm focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                    />
                </div>
            </PageHeader>

            <div className="mt-8 relative min-h-[400px]">
                <PatientAttachmentTable
                    appointments={filteredAppointments}
                    isLoading={isAppointmentsLoading}
                    onAddPrescription={handleAddPrescription}
                    onViewAttachments={handleViewAttachments}
                />
            </div>

            {/* مودال الإضافة */}
            <AddPrescriptionModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModals}
                appointment={selectedAppointment}
            />

            {/* مودال العرض - تم تصحيح الـ isOpen هنا */}
            <ViewAttachmentsModal
                isOpen={isViewModalOpen}
                onClose={handleCloseModals}
                appointment={selectedAppointment}
            />
        </div>
    );
};

export default PatientsReportsPage;