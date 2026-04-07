import React, { useState, useMemo } from 'react';
import {
    CalendarDays, Search, Clock, CheckCircle2,
    XCircle, CalendarClock,
    LayoutList, Stethoscope,
    ClipboardList
} from 'lucide-react';
import { useAppointment } from '../../../hocks/useAppointment';
import AppointmentTable from '../../Admin_Dashboard/appointments/appointmentsManagement/component/AppointmentTable';
import AppointmentDetailsModal from '../../Admin_Dashboard/appointments/appointmentsManagement/modals/AppointmentDetailsModal';
import { useAuth } from '../../../hocks/useAuth';
import { StatCard } from './../../Admin_Dashboard/appointments/appointmentsManagement/component/StatCard';
import PageHeader from './../../Admin_Dashboard/component/PageHeader';

const PatientAppointmentsPage = () => {
    const { user } = useAuth()
    console.log(user)
    const patientId = user?.patientId

    const [activeTab, setActiveTab] = useState('Accepted');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        getPatientAppointments, // استخدام الدالة الجديدة المخصصة للمريض
        cancelWithReason
    } = useAppointment();

    // جلب مواعيد المريض فقط
    const { data: patientData, isLoading } = getPatientAppointments(patientId);

    console.log(patientData)
    const tabs = [
        { id: 'Accepted', label: 'مواعيد مقبولة', icon: CalendarClock, color: 'emerald' },
        { id: 'Pending', label: 'قيد الانتظار', icon: Clock, color: 'amber' },
        { id: 'Canceled', label: 'ملغية', icon: XCircle, color: 'rose' },
        { id: 'All', label: 'كل السجل', icon: LayoutList, color: 'amber' },
    ];

    // فلترة البيانات بناءً على التبويب المختار (Status) ثم البحث
    const filteredAppointments = useMemo(() => {
        if (!patientData) return [];

        // 1. الفلترة حسب الحالة (Status)
        let filtered = activeTab === 'All'
            ? patientData
            : patientData.filter(app => app.status === activeTab);

        // 2. الفلترة حسب البحث (اسم الطبيب أو التخصص)
        const search = searchTerm.trim().toLowerCase();
        if (search) {
            filtered = filtered.filter(item => {
                const doctorName = (item.doctorName || "").toLowerCase();
                const specialization = (item.specialization || "").toLowerCase();
                return doctorName.includes(search) || specialization.includes(search);
            });
        }

        return filtered;
    }, [patientData, activeTab, searchTerm]);

    const currentTabInfo = tabs.find(t => t.id === activeTab);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">

            <PageHeader title="حوجزاتي الخاصة" description="متابعة الحجز الخاص بي" icon={ClipboardList}>
                <div className="relative w-full md:w-80">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="بحث بالاسم أو الرقم..."
                        className="pr-12 pl-4 py-3.5 bg-white dark:bg-slate-800/50 dark:text-white border border-slate-200 dark:border-white/5 rounded-2xl w-full outline-none transition-all text-sm focus:ring-2 focus:ring-cyan-500/20"
                    />
                </div>
            </PageHeader>

            <div className='md:flex items-center justify-between gap-4 mb-8'>
                <div className="flex flex-wrap gap-2 bg-slate-100/50 dark:bg-white/5 p-2 rounded-[2rem] border border-slate-200/50 dark:border-white/5">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all
                                    ${isActive
                                        ? `bg-white dark:bg-cyan-600 shadow-sm text-cyan-700 dark:text-white scale-105`
                                        : `text-slate-500 hover:text-cyan-600 dark:hover:text-slate-300`}
                                `}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {!isLoading && currentTabInfo && (
                    <StatCard
                        label={`إجمالي ${currentTabInfo.label}`}
                        count={filteredAppointments.length}
                        icon={currentTabInfo.icon}
                        colorClass={currentTabInfo.color}
                    />
                )}
            </div>

            <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                <AppointmentTable
                    appointments={filteredAppointments}
                    isLoading={isLoading}
                    onChangeStatus={null} // المريض لا يملك صلاحية تغيير الحالة
                    onCancel={cancelWithReason}
                    onView={handleViewDetails}
                    activeStatus={activeTab}
                    isPatientView={true}
                />
            </div>

            {isModalOpen && (
                <AppointmentDetailsModal
                    item={selectedAppointment}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCancel={cancelWithReason}
                    isPatientView={true}
                />
            )}
        </div>
    );
};

export default PatientAppointmentsPage;