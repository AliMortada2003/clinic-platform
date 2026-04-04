import React, { useState, useMemo } from 'react';
import {
    ClipboardList, Search, Clock, CheckCircle2,
    XCircle, CalendarClock
} from 'lucide-react';
import { useAppointment } from '../../../hocks/useAppointment';
import PageHeader from '../component/PageHeader';
import { StatCard } from './appointmentsManagement/component/StatCard';
import AppointmentTable from './appointmentsManagement/component/AppointmentTable';
import AppointmentDetailsModal from './appointmentsManagement/modals/AppointmentDetailsModal';

const AppointmentsPage = () => {
    // 1. حالات التحكم في الواجهة
    const [activeTab, setActiveTab] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');

    // حالة المودال والموعد المختار
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        getAppointmentsByStatus,
        appointments: allAppointments,
        isLoading: isAllLoading,
        changeStatus,
        cancelWithReason
    } = useAppointment();

    // 2. جلب البيانات بناءً على التبويب المختار
    const { data: statusData, isLoading: isStatusLoading } = getAppointmentsByStatus(activeTab === 'Today' ? null : activeTab);

    // 3. تعريف التبويبات
    const tabs = [
        { id: 'Today', label: 'حجوزات اليوم', icon: CalendarClock, color: 'indigo', isSpecial: true },
        { id: 'Pending', label: 'قيد الانتظار', icon: Clock, color: 'amber' },
        { id: 'Accepted', label: 'تم القبول', icon: CheckCircle2, color: 'emerald' },
        { id: 'Canceled', label: 'ملغي', icon: XCircle, color: 'rose' },
    ];

    // 4. منطق الفلترة (اليوم + البحث)
    const filteredAppointments = useMemo(() => {
        let baseData = activeTab === 'Today' ? allAppointments : statusData;

        if (!baseData) return [];

        if (activeTab === 'Today') {
            const todayStr = new Date().toISOString().split('T')[0];
            baseData = baseData.filter(item => item.date?.startsWith(todayStr));
        }

        return baseData.filter(item => {
            const name = (item.guestName || item.patientName || "").toLowerCase();
            const phone = (item.guestPhone || item.patientPhone || "");
            const search = searchTerm.toLowerCase();
            return name.includes(search) || phone.includes(search);
        });
    }, [activeTab, allAppointments, statusData, searchTerm]);

    const currentTabInfo = tabs.find(t => t.id === activeTab);
    const isLoading = activeTab === 'Today' ? isAllLoading : isStatusLoading;

    // دالة فتح التفاصيل
    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
            {/* Header القسم العلوي */}
            <PageHeader title="إدارة الحجوزات" description="متابعة وتصنيف طلبات الكشف اليومية" icon={ClipboardList}>
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
                {/* نظام التبويبات (Tabs) */}
                <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-white/5 p-1.5 rounded-[2rem] w-fit border border-slate-200 dark:border-white/5 relative z-10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all duration-300 relative
                                    ${isActive
                                        ? `bg-white dark:bg-white/10 shadow-md text-cyan-600 dark:text-cyan-400 scale-105`
                                        : `dark:text-slate-400 text-slate-500 hover:bg-white/50 dark:hover:bg-white/5`}
                                `}
                            >
                                <Icon size={16} className={isActive ? `text-cyan-500` : 'text-slate-400'} />
                                {tab.label}
                                {tab.isSpecial && (
                                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* بطاقة الإحصائيات */}
                {!isLoading && (
                    <StatCard
                        label={`إجمالي ${currentTabInfo.label}`}
                        count={filteredAppointments.length}
                        icon={currentTabInfo.icon}
                        colorClass={currentTabInfo.color}
                    />
                )}
            </div>

            {/* عرض الجدول */}
            <div className="relative min-h-[400px]">
                <AppointmentTable
                    appointments={filteredAppointments}
                    isLoading={isLoading}
                    onChangeStatus={changeStatus.mutate}
                    onCancel={cancelWithReason}
                    onView={handleViewDetails}
                    activeStatus={activeTab}
                />
            </div>

            {/* مودال التفاصيل */}
            {isModalOpen && (
                <AppointmentDetailsModal
                    item={selectedAppointment}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onChangeStatus={changeStatus.mutate}
                    onCancel={cancelWithReason}
                />
            )}
        </div>
    );
};

export default AppointmentsPage;