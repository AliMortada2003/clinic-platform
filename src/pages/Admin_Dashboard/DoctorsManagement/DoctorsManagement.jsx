import React, { useState } from 'react';
import { Loader2, Users, Search, UserPlus } from 'lucide-react';
import Swal from 'sweetalert2';

import { useDoctors } from '../../../hocks/useDoctors';
import AddDoctorModal from './AddDoctorModal';
import EditDoctorModal from './EditDoctorModal';
import DoctorsTable from './DoctorsTable';
import PageHeader from './../../../components/ui/layout/PageHeader';

const DoctorsManagement = () => {
    const { allDoctors, isLoading, deleteDoctor, registerDoctor, updateDoctor } = useDoctors();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);


    const confirmDelete = (id, name) => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: `سيتم حذف حساب د. ${name} نهائياً!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
            customClass: { popup: 'rounded-[2rem] dark:bg-slate-900 dark:text-white' }
        }).then((result) => {
            if (result.isConfirmed) deleteDoctor.mutate(id)
        });
    };

    const filteredDoctors = allDoctors?.filter(doc =>
        `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.clinicLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // تعريف الـ Actions التي ستظهر في الهيدر
    const headerActions = (
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="بحث باسم الطبيب أو العيادة..."
                    className="pr-12 pl-4 py-3 bg-white dark:bg-slate-800/50 dark:text-white border border-slate-200 dark:border-white/5 rounded-2xl w-full outline-none transition-all text-sm focus:ring-2 focus:ring-cyan-500/20 font-bold shadow-sm"
                />
            </div>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-2xl font-black hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20 whitespace-nowrap w-full md:w-auto active:scale-95"
            >
                <UserPlus size={18} />
                إضافة طبيب
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-[#0b1120] p-4 md:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* تمرير البيانات للهيدر حسب الـ Props المطلوبة */}
                <PageHeader
                    title="إدارة الأطباء"
                    subtitle="إضافة، تعديل، وحذف بيانات الأطباء في النظام"
                    breadcrumb="الرئيسية / الأطباء"
                    actions={headerActions}
                    dark={false}
                />

                {isLoading ? (
                    <div className="py-40 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-cyan-600" size={48} />
                        <p className="text-slate-400 font-black italic text-sm">جاري التحميل...</p>
                    </div>
                ) : (
                    <DoctorsTable
                        doctors={filteredDoctors}
                        onEdit={setSelectedDoctor}
                        onDelete={confirmDelete}
                    />
                )}
            </div>

            <AddDoctorModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={(data) => registerDoctor.mutate(data, { onSuccess: () => setIsAddModalOpen(false) })}
            />

            <EditDoctorModal
                doctor={selectedDoctor}
                isOpen={!!selectedDoctor}
                onClose={() => setSelectedDoctor(null)}
                onUpdate={(id, data) => updateDoctor.mutate(id, data, { onSuccess: () => setSelectedDoctor(null) })}
            />
        </div>
    );
};

export default DoctorsManagement;