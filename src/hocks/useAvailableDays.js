import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import availableDayService from './../services/availableDaysService';

export const useAvailableDays = () => {
    const queryClient = useQueryClient();

    // إعدادات Swal الموحدة للـ Dark Mode
    const swalConfig = {
        timer: 2000,
        showConfirmButton: false,
        background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        customClass: { popup: 'rounded-[2rem]' }
    };

    // 1. جلب كل الأيام
    const { data: days, isLoading, error } = useQuery({
        queryKey: ["allDays"],
        queryFn: availableDayService.getAll,
    });

    // 2- جلب كل الايام المتاحة فقط

    const { data: availableDays } = useQuery({
        queryKey: ["availableDays"],
        queryFn: availableDayService.getAllAvailableDays
    })
    // 2. إضافة يوم جديد
    const { mutate: addDay, isLoading: isAdding } = useMutation({
        mutationFn: (dayData) => availableDayService.add(dayData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDays"] });
            Swal.fire({ ...swalConfig, icon: 'success', title: 'تم إضافة اليوم بنجاح' });
        },
        onError: (err) => Swal.fire({ ...swalConfig, icon: 'error', title: `${err?.response?.data}` })
    });

    // 3. تفعيل يوم
    const { mutate: activateDay } = useMutation({
        mutationFn: (id) => availableDayService.activate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDays"] });
            Swal.fire({ ...swalConfig, icon: 'success', title: 'تم تفعيل اليوم' });
        }
    });

    // 4. إلغاء تفعيل (Cancel) يوم
    const { mutate: cancelDay } = useMutation({
        mutationFn: (id) => availableDayService.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDays"] });
            Swal.fire({ ...swalConfig, icon: 'info', title: 'تم إلغاء تفعيل اليوم' });
        }
    });

    // 5. حذف يوم نهائياً
    const { mutate: deleteDay } = useMutation({
        mutationFn: (id) => availableDayService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allDays"] });
            Swal.fire({ ...swalConfig, icon: 'success', title: 'تم حذف اليوم نهائياً' });
        }
    });

    return {
        days,
        isLoading,
        error,
        addDay,
        isAdding,
        activateDay,
        cancelDay,
        availableDays,
        deleteDay
    };
};