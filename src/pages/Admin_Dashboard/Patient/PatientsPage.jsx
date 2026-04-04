import React, { useState, useMemo } from 'react';
import { Users, Search, TrendingUp, UserCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';
import PageHeader from '../component/PageHeader';
import StatCard from './../../../components/ui/cards/StatCard';
import { usePatient } from './../../../hocks/UsePatient';
import PatientTable from './component/PatientTable';
import EditPatientModal from './modals/EditPatientModal';
import ViewPatientModal from './modals/ViewPatientModal';

const PatientsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false); // State جديدة
    const { patients, isLoading, deletePatient, updatePatient } = usePatient();

    const filteredPatients = useMemo(() => {
        return patients.filter(p =>
            `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.phoneNumber.includes(searchTerm)
        );
    }, [patients, searchTerm]);

    const stats = useMemo(() => {
        const total = patients?.length || 0;
        const avgAge = total > 0 ? Math.round(patients.reduce((a, b) => a + b.age, 0) / total) : 0;
        const males = patients?.filter(p => p.gender === 'Male').length || 0;
        const females = patients?.filter(p => p.gender === 'Female').length || 0;
        return { total, avgAge, males, females };
    }, [patients]);

    console.log(patients)
    const handleDelete = (id) => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "لن تتمكن من استعادة بيانات المريض!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
            confirmButtonColor: '#ef4444',
            reverseButtons: true
        }).then((res) => { if (res.isConfirmed) deletePatient.mutate(id); });
    };

    const openEditModal = (patient) => {
        setSelectedPatient(patient);
        setEditModalOpen(true);
    };

    // دالة فتح مودال العرض
    const openViewModal = (patient) => {
        setSelectedPatient(patient);
        setViewModalOpen(true);
    };
    const handleUpdate = (id, values) => {
        updatePatient.mutate({ id, data: values }, {
            onSuccess: () => setEditModalOpen(false)
        });
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
            <PageHeader title="سجل المرضى" description="إدارة شاملة لبيانات المرضى" icon={Users}>
                <div className="relative ">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="بحث بالاسم أو الرقم..."
                        className="pr-12 pl-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl w-full outline-none focus:ring-2 dark:text-white focus:ring-cyan-500/20"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </PageHeader>

            <div className="grid grid-cols-1  md:grid-cols-4 gap-6 mb-10">
                <StatCard title="الإجمالي" value={stats.total} icon={Users} accent="bg-indigo-600" />
                <StatCard title="متوسط العمر" value={stats.avgAge} icon={TrendingUp} accent="bg-emerald-600" />
                <StatCard title="الذكور" value={stats.males} icon={UserCircle2} accent="bg-blue-500" />
                <StatCard title="الإناث" value={stats.females || 0} icon={UserCircle2} accent="bg-blue-500" />
            </div>

            <div className="w-full max-w-full overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm backdrop-blur-md">
                <div className="overflow-x-auto">
                    <PatientTable
                        patients={filteredPatients}
                        isLoading={isLoading}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                        onView={openViewModal}
                    />
                </div>
            </div>
            <EditPatientModal
                isOpen={isEditModalOpen}
                patient={selectedPatient}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdate}
            />

            {/* مودال العرض الجديد */}
            <ViewPatientModal
                isOpen={isViewModalOpen}
                patient={selectedPatient}
                onClose={() => setViewModalOpen(false)}
            />
        </div>
    );
};

export default PatientsPage;