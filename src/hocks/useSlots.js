import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import availableSlotService from "../services/slotService";
import Swal from "sweetalert2";

export const useSlots = (dayId) => {
    const queryClient = useQueryClient();

    // إعدادات Swal للـ Dark Mode
    const swalConfig = {
        timer: 2000,
        showConfirmButton: false,
        background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        customClass: { popup: 'rounded-[2rem]' }
    };

    // 1. جلب الساعات الخاصة باليوم المحدد
    const { data: slots, isLoading, error } = useQuery({
        queryKey: ["slots", dayId],
        queryFn: () => availableSlotService.getByDay(dayId),
        enabled: !!dayId, // لا يتم التنفيذ إلا إذا وجد ID لليوم
    });

    // 2. هوك إضافة ساعة جديدة
    const { mutate: addSlot, isLoading: isAdding } = useMutation({
        mutationFn: (slotData) => availableSlotService.add(dayId, slotData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["slots", dayId] });
            Swal.fire({
                ...swalConfig,
                icon: 'success',
                title: 'تمت الإضافة',
                text: 'تم إضافة موعد جديد للجدول'
            });
        },
        onError: () => {
            Swal.fire({ ...swalConfig, icon: 'error', title: 'عفواً', text: 'حدث خطأ أثناء الإضافة' });
        }
    });

    // 3. هوك حذف ساعة
    const { mutate: deleteSlot, isLoading: isDeleting } = useMutation({
        mutationFn: (slotId) => availableSlotService.delete(slotId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["slots", dayId] });
            Swal.fire({
                ...swalConfig,
                icon: 'success',
                title: 'تم الحذف',
                text: 'تم إزالة الموعد من الجدول'
            });
        },
        onError: () => {
            Swal.fire({ ...swalConfig, icon: 'error', title: 'خطأ', text: 'لم يتم الحذف، حاول مرة أخرى' });
        }
    });

    return {
        slots,
        isLoading,
        error,
        addSlot,
        isAdding,
        deleteSlot,
        isDeleting
    };
};