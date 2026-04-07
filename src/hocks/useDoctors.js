import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { doctorService } from './../services/doctor';

export const useDoctors = (id = null) => {
    const queryClient = useQueryClient();

    // 1. استعلام جلب دكتور واحد
    const doctorQuery = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => doctorService.getOne(id),
        enabled: !!id,
    });

    // 2. استعلام جلب كل الدكاترة
    const allDoctorsQuery = useQuery({
        queryKey: ['doctors'],
        queryFn: doctorService.getAll,
        enabled: !id,
    });

    // 3. Mutation تسجيل طبيب جديد
    const registerDoctor = useMutation({
        mutationFn: (data) => doctorService.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['doctors']);
            Swal.fire({
                title: 'تمت الإضافة!',
                text: 'تم تسجيل الدكتور الجديد بنجاح في النظام.',
                icon: 'success',
                confirmButtonColor: '#0891b2',
                customClass: { popup: 'rounded-[3rem]' }
            });
        },
        onError: (error) => {
            console.log(error.response?.data)
            Swal.fire({
                title: 'فشل التسجيل',
                text: error?.response?.data || 'تأكد من البيانات وحاول مرة أخرى',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'rounded-[3rem]' }
            });
        }
    });

    // 4. Mutation التحديث
    const updateDoctor = useMutation({
        mutationFn: (data) => doctorService.patch(id || data.id, data), // دعم الـ ID من البرامز أو الداتا
        onMutate: () => { Swal.showLoading(); },
        onSuccess: () => {
            queryClient.invalidateQueries(['doctor', id]);
            queryClient.invalidateQueries(['doctors']);
            Swal.fire({
                title: 'تم بنجاح!',
                text: 'تم تحديث بيانات الطبيب بنجاح.',
                icon: 'success',
                confirmButtonColor: '#0891b2',
                timer: 2000,
                customClass: { popup: 'rounded-[3rem]' }
            });
        },
    });

    // 5. Mutation الحذف (هذا ما كان ينقصك)
    const deleteDoctor = useMutation({
        mutationFn: (doctorId) => doctorService.delete(doctorId),
        onSuccess: () => {
            queryClient.invalidateQueries(['doctors']);
            Swal.fire({
                title: 'تم الحذف!',
                text: 'تم حذف حساب الطبيب من النظام نهائياً.',
                icon: 'success',
                confirmButtonColor: '#0891b2',
                customClass: { popup: 'rounded-[3rem]' }
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'خطأ في الحذف',
                text: error?.response?.data?.message || 'لا يمكن حذف هذا الطبيب حالياً.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'rounded-[3rem]' }
            });
        }
    });

    return {
        doctor: doctorQuery.data,
        allDoctors: allDoctorsQuery.data,
        isLoading: doctorQuery.isLoading || allDoctorsQuery.isLoading,
        registerDoctor,
        updateDoctor,
        deleteDoctor, // تأكد من وجودها هنا
    };
};