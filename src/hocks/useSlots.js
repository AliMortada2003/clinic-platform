import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addSlotToDay, deleteSlot, getSlotsByDay } from "../services/slotService";

export const useSlots = (dayId) => {
    const queryClient = useQueryClient();

    // 1. جلب الساعات الخاصة باليوم المحدد
    const getSlotsQuery = useQuery({
        queryKey: ["slots", dayId],
        queryFn: () => getSlotsByDay(dayId),
        enabled: !!dayId, // لا يتم التنفيذ إلا إذا وجد ID لليوم
    });

    // 2. هوك إضافة ساعة جديدة
    const addSlotMutation = useMutation({
        mutationFn: (slotData) => addSlotToDay(dayId, slotData),
        onSuccess: () => {
            // تحديث قائمة الساعات فور الإضافة
            queryClient.invalidateQueries({ queryKey: ["slots", dayId] });
        },
    });

    // 3. هوك حذف ساعة
    const deleteSlotMutation = useMutation({
        mutationFn: (slotId) => deleteSlot(slotId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["slots", dayId] });
        },
    });

    return {
        slots: getSlotsQuery.data,
        isLoading: getSlotsQuery.isLoading,
        error: getSlotsQuery.error,
        addSlot: addSlotMutation.mutate,
        isAdding: addSlotMutation.isLoading,
        deleteSlot: deleteSlotMutation.mutate,
        isDeleting: deleteSlotMutation.isLoading
    };
};