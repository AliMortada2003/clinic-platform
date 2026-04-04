import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { PatientServices } from '../services/Patient';

export const usePatient = () => {
    const queryClient = useQueryClient();

    const { data: patients = [], isLoading, error } = useQuery({
        queryKey: ['patients'],
        queryFn: PatientServices.getAll,
        staleTime: 1000 * 60 * 5,
    });

    const updatePatient = useMutation({
        mutationFn: ({ id, data }) => PatientServices.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['patients']);
            Swal.fire({
                title: 'تم التحديث!',
                text: 'تم تعديل بيانات المريض بنجاح.',
                icon: 'success',
                confirmButtonText: 'حسناً',
                timer: 2000
            });
        },
        onError: (err) => {
            Swal.fire('خطأ!', err.response?.data?.message || 'فشل التحديث', 'error');
        }
    });

    const deletePatient = useMutation({
        mutationFn: (id) => PatientServices.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['patients']);
            Swal.fire('تم الحذف!', 'تم إزالة المريض من النظام.', 'success');
        },
        onError: (err) => {
            Swal.fire('عفواً!', err.response?.data?.message || 'لا يمكن الحذف حالياً', 'error');
        }
    });

    return { patients, isLoading, error, updatePatient, deletePatient };
};